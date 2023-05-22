from flask import Flask, render_template, request, Response, url_for, redirect, session, jsonify
import io
import json
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib
matplotlib.use('Agg')
import base64

# import tweepy as tw
import os
import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import nltk
# nltk.download('stopwords')
# nltk.download('punkt')
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer, WordNetLemmatizer
from wordcloud import WordCloud, STOPWORDS
from flask_mysqldb import MySQL
import MySQLdb.cursors
import re
from flask_cors import CORS
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone
from flask_bcrypt import generate_password_hash
from flask_bcrypt import check_password_hash

import praw

app = Flask(__name__)

CORS(app)

print("mysql_host:",os.environ.get("MYSQL_HOST"))
app.config['MYSQL_HOST'] = os.environ.get("MYSQL_HOST")
# app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_USER'] = os.environ.get("MYSQL_USER")
app.config['MYSQL_PASSWORD'] = os.environ.get("MYSQL_PASS")
app.config['MYSQL_DB'] = os.environ.get("MYSQL_DB")
# app.config['MYSQL_DATABASE_CHARSET'] = 'utf-8'
app.config["JWT_SECRET_KEY"] = "secret key"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

jwt = JWTManager(app)

mysql = MySQL(app)

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@app.route('/login', methods=["POST"])
def create_token():
    data = request.get_json()
    print(data)
    email = data['email']
    password = data['password']
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM reddit_analysis.registerdb WHERE emailid = % s', [email])
    account = cursor.fetchone()
    if account:
        print(account)
        if check_password_hash(account["password"], password):
            access_token = create_access_token(identity=email)
            response = {"access_token": access_token,"status":200}
            return response
        else:
            response = {"msg":"wrong password", "status":401}
            return response
    else:
        response = {"msg": "Wrong email", "status":401}
        return response


@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

@app.route('/register', methods=['GET','POST'])
def register():
    msg = ''
    access_token=None
    if request.method == 'POST':
        register_data = request.get_json()
        print(register_data)
        fullname = register_data['fullname']
        emailid = register_data['emailid']
        occupation = register_data['occupation']
        purpose = register_data['purpose']
        password = register_data['password']

        # cur = mysql.connection.cursor()
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM reddit_analysis.registerdb WHERE emailid = %s', [emailid])
        account = cursor.fetchone()
        print("account", account)
        if account:
            msg = 'Account already exists !'
            return jsonify(msg), 400
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', emailid):
            msg = 'Invalid email address !'
        else:
            password = generate_password_hash(password, 10)
            cursor.execute("Insert into reddit_analysis.registerdb(fullname,emailid,occupation,purpose,password) values(%s,%s,%s,%s,%s)",(fullname,emailid,occupation,purpose,password))
            mysql.connection.commit()
            msg = 'success'
            cursor.close()
            access_token = create_access_token(identity=emailid)
        response = {"msg":msg, "access_token": access_token}
        return response


@app.route('/', methods=['POST', 'GET'])
def home(keyword):
    if request.method == 'POST':
    # keyword = 'cricket'
        count = 8
        sentiment_score, wordcloud_image, most_tags, tags_image, most_subreddit, subreddit_image, words, words_image, bigrams, bigrams_image = analyse(keyword, count)
        return sentiment_score, wordcloud_image, most_tags, tags_image, most_subreddit, subreddit_image, words, words_image, bigrams, bigrams_image

@app.route('/plot',methods=['GET','POST'])
def plot():
    data = request.get_json()
    print(data)
    keyword = data['keyword']
    print(keyword)
    sentiment_score, wordcloud_image, most_tags, tags_image, most_subreddit, subreddit_image, words, words_image, bigrams, bigrams_image = home(keyword)
    
    print("sentiment_score:",sentiment_score)

    # most_tags=most_tags.to_json()
    
    # most_subreddit = most_subreddit.to_json()
    
    # words = words.to_json()
    
    # bigrams = bigrams.to_json()
    
    # return ({'keyword': keyword, 'wordcloud_image': image})

    most_tags_=[]
    for key,value in most_tags.items():
        most_tags_.append({key:value})
    print("most_tags:", most_tags_)

    most_subreddit_=[]
    for key,value in most_subreddit.items():
        most_subreddit_.append({str(key.display_name):value})
    print("most_subreddit", most_subreddit_)

    words_=[]
    for key,value in words.items():
        words_.append({key:value})
    print("words", words_)

    bigrams_=[]
    for key,value in bigrams.items():
        bigrams_.append({str(key):value})
    print("bigrams", bigrams_)

    
    dict_={'keyword':keyword, 'sentiment_score':sentiment_score, 'wordcloud_image':wordcloud_image, 'most_tags':most_tags_, 'most_subreddit':most_subreddit_, 'tags_image':tags_image, 'subreddit_image':subreddit_image, 'words':words_, 'words_image':words_image, 'bigrams':bigrams_, 'bigrams_image':bigrams_image}
    # json_obj=json.dumps(dict_,indent=4)
    return dict_


def plot_wordcloud(wordcloud):
    img = io.BytesIO()

    plt.figure(figsize=(10, 8))
    plt.axis('off')
    plt.imshow(wordcloud)

    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return "data:image/png;base64,{}".format(plot_url)


def plot_tags(tags):
    img = io.BytesIO()
    print("tags:",tags)
    if tags.empty:
        return ""
    plt.figure(figsize=(14, 14))
    plt.rcParams.update({'font.size': 22})
    tags.plot(kind='bar', y="count", x="tags")
    plt.suptitle('Top tags in posts')

    print("tags:",tags)
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return "data:image/png;base64,{}".format(plot_url)

def plot_subreddit(subreddit):
    img = io.BytesIO()
    print("subreddit:",subreddit)
    if subreddit.empty:
        return ""
    plt.figure(figsize=(14, 18))
    # plt.rcParams.update({'font.size': 22})
    subreddit.plot(kind='bar', y="count", x="subreddit")
    plt.suptitle('Top subreddits')

    print("subreddit:",subreddit)
    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return "data:image/png;base64,{}".format(plot_url)


def plot_most_occuring_words(words, keyword):
    img = io.BytesIO()

    words.plot(kind='bar', y='occurence', x='word')
    plt.grid(False)
    plt.suptitle('Top 10 Words for keyword: '+keyword, fontsize=18)

    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return "data:image/png;base64,{}".format(plot_url)


def plot_most_occuring_bigrams(words, keyword):
    img = io.BytesIO()

    words.plot(kind='bar', y='occurence', x='bigram')
    plt.grid(False)
    plt.suptitle('Top 10 Bigrams for keyword: '+keyword, fontsize=18)

    plt.savefig(img, format='png')
    img.seek(0)
    plot_url = base64.b64encode(img.getvalue()).decode()
    return "data:image/png;base64,{}".format(plot_url)


def analyse(keyword, count):

    client_id=os.environ.get("REDDIT_CLIENT_ID")
    client_secret=os.environ.get("REDDIT_CLIENT_SECRET")
    user_agent=os.environ.get("REDDIT_USER_AGENT")

    reddit = praw.Reddit(client_id=client_id,
                     client_secret=client_secret,
                     user_agent=user_agent)
    
    all_r = reddit.subreddit("all")

    # no. of posts and keyword
    limit_=count

    post_heading=[]
    post_id=[]
    post_url=[]
    post_upvotes=[]
    post_comm_cnt=[]
    post_awards_cnt=[]
    post_subreddit=[]
    post_tags=[]

    post_comments=[]

    for submission in all_r.search(keyword, limit=limit_, sort="hot"):
#         print(vars(submission))
        print("title:",submission.title)
        post_heading.append(submission.title)

        print("id:",submission.id)
        post_id.append(submission.id)

        print("url:",submission.url)
        post_url.append(submission.url)

        print("upvotes:",submission.ups)
        post_upvotes.append(submission.ups)

        print("comments count:",submission.num_comments)
        post_comm_cnt.append(submission.num_comments)
        
        print("subreddit:",submission.subreddit)
        post_subreddit.append(submission.subreddit)

        print("awards received:",submission.total_awards_received)
        post_awards_cnt.append(submission.total_awards_received)
        
        print("tags:",submission.link_flair_text)
        post_tags.append(submission.link_flair_text)

        print("---------------------------------------------------------------------------------------------------------------")

        post_comments.append(submission.comments)
    

    ### Making Dataframe
    post_df = pd.DataFrame(list(zip(post_id,post_heading,post_upvotes,post_subreddit,post_comm_cnt,post_awards_cnt,post_tags,post_url)),columns=['id','title','upvotes','subreddit','comments_count','awards_count','tags','url'])
    post_df

    ### Getting Comments
    raw_data=""
    for cmnt in post_comments:
        cmnt.replace_more(limit=0)
        for top_level_comment in cmnt:
            # print(top_level_comment.body)
            raw_data = raw_data+" "+top_level_comment.body

    ### Data Processing
    swords = stopwords.words("english")

    processed_data = raw_data.lower().replace('[deleted]',' ')
    processed_data=re.sub("http\S+",' ',processed_data)
    processed_data = re.sub("[^a-z0-9']",' ',processed_data)
    processed_data = ' '.join(processed_data.split())

    final_data=""
    for word in processed_data.split(' '):
        if word not in swords:
            final_data=final_data+" "+word
    final_data

    # ### Stemming
    ps = PorterStemmer()
    stemmed_data=""
    for i in final_data.split(' '):
        if i!='':
            stemmed_data=stemmed_data+" "+ps.stem(i)
    stemmed_data

    ### Lemmatization
    # lemmatizer = WordNetLemmatizer()
    # stemmed_data=""
    # for i in final_data.split(' '):
    #     if i!='':
    #         stemmed_data=stemmed_data+" "+lemmatizer.lemmatize(i)
    # stemmed_data


    ### Sentiment Analysis

    import nltk.sentiment.vader as vd
    from nltk import download
    # download('vader_lexicon')
    # download('wordnet')

    sia = vd.SentimentIntensityAnalyzer()

    from nltk.tokenize import word_tokenize

    pol_score = sia.polarity_scores(processed_data)
    print("score:", pol_score['compound'])
    pol_score=pol_score['compound']
    if -1 <= pol_score <= -0.5:
        sentiment="Negative"
    elif -0.5 < pol_score <= 0.5:
        sentiment="Neutral"
    elif 0.5 < pol_score <= 1:
        sentiment="Positive"
    pol_score=round(pol_score,2)
    print("score after rounding off:", pol_score)
    print("sentiment:",sentiment)

    ### Word cloud
    wordcloud = WordCloud(stopwords=STOPWORDS,
                          background_color='white',
                          width=400,
                          height=330
                          ).generate_from_text(stemmed_data)

    # plt.figure(figsize=(10, 8))
    # plt.axis('off')
    # plt.imshow(wordcloud)
    wordcloud_image = plot_wordcloud(wordcloud)


    ### Top tags

    most_tags = post_df['tags'].value_counts()[:10]
    # most_tags.drop(None, inplace=True)
    # most_tags = most_tags[most_tags >= 1]
    most_tags

    tags_image = plot_tags(most_tags)

    ### Top mentioned users

    most_subreddit = post_df['subreddit'].value_counts()[:10]
    # most_tags.drop(None, inplace=True)
    # most_tags = most_tags[most_tags >= 3]
    most_subreddit
    subreddit_image = plot_subreddit(most_subreddit)

    ### Most occuring words

    top_words=pd.Series(stemmed_data.split(' '))
    top_words=top_words.value_counts()[:10]
    top_words

    top_words_image = plot_most_occuring_words(top_words, keyword)

    ### Most occuring bigrams

    from nltk import bigrams
    tokens = word_tokenize(stemmed_data)
    bigrams=nltk.bigrams(tokens)
    bigrams_series=pd.Series(list(bigrams))
    bigrams_df=bigrams_series.value_counts()[:10]
    # bigrams_df[:10].plot(kind='bar',x='bigram',y='occurence')
    bigrams_df

    most_bigrams_image = plot_most_occuring_bigrams(bigrams_df, keyword)
    senti=[str(pol_score),sentiment]
    
    return senti, wordcloud_image, most_tags, tags_image, most_subreddit ,subreddit_image, top_words, top_words_image, bigrams_df, most_bigrams_image



