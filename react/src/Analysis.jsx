import React from "react";

const Analysis = (props) => {
  // console.log(props);

  console.log(props.data1.bigrams);

  // console.log(JSON.parse(props.data1.bigrams));
  return (
    <>
      {props?.data1.sentiment_score?.length > 0 && (
        <div className="flex justify-between items-center">
          <div class="flex flex-col w-50 h-50 my-3">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <h3 className="text-center">Sentiment</h3>
                  <table className="min-w-full border ">
                    <thead className="border-b">
                      <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Score
                      </th>
                      <th class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Sentiment
                      </th>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b">
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {props?.data1?.sentiment_score[0]}
                        </td>
                        <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          {props?.data1?.sentiment_score[1]}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="w-50 h-50">
            {props?.data1?.sentiment_score_image?.length > 0 && (
              <img src={props?.data1?.sentiment_score_image} alt="image"></img>
            )}
          </div> */}
        </div>
      )}
      {/* <h3>WordCloud</h3> */}

      {props?.data1.wordcloud_image?.length > 0 && (
        <div class="flex justify-center">
          <div class="rounded-lg shadow-lg bg-white max-w-sm">
            {props?.data1?.wordcloud_image.length > 0 && (
              <img src={props?.data1?.wordcloud_image} alt="image"></img>
            )}
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">WordCloud</h5>
            </div>
          </div>
        </div>
      )}

      <br />
      <br />

      <br />
      <br />
      {props?.data1.most_tags?.length > 0 && (
        <div className="flex justify-between items-center">
          <div class="flex flex-col w-50 h-50">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Tag
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Occurance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data1?.most_tags?.map((item, i) => (
                        <tr class="bg-white border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {Object.keys(item)[0]}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item[Object.keys(item)[0]]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50 h-50">
            {props?.data1.tags_image.length > 0 && (
              <img src={props?.data1.tags_image} alt="image"></img>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
      {props?.data1?.most_subreddit?.length > 0 && (
        <div className="flex justify-between items-center">
          <div class="flex flex-col w-50 h-50">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Subreddit
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Occurance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data1?.most_subreddit?.map((item, i) => (
                        <tr class="bg-white border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {Object.keys(item)[0]}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item[Object.keys(item)[0]]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50 h-50">
            {props?.data1?.subreddit_image.length > 0 && (
              <img src={props?.data1?.subreddit_image} alt="image"></img>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
      {props?.data1?.words?.length > 0 && (
        <div className="flex justify-between items-center">
          <div class="flex flex-col w-50 h-50">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Word
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Occurance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data1?.words?.map((item, i) => (
                        <tr class="bg-white border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {Object.keys(item)[0]}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item[Object.keys(item)[0]]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50 h-50">
            {props?.data1.words_image.length > 0 && (
              <img src={props?.data1.words_image} alt="image"></img>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
      {props?.data1?.bigrams?.length > 0 && (
        <div className="flex justify-between items-center">
          <div class="flex flex-col w-50 h-50">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                  <table class="min-w-full border">
                    <thead class="border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Bigrams
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                        >
                          Occurance
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {props?.data1?.bigrams?.map((item, i) => (
                        <tr class="bg-white border-b">
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {Object.keys(item)[0]}
                          </td>
                          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                            {item[Object.keys(item)[0]]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="w-50 h-50">
            {props?.data1.bigrams_image.length > 0 && (
              <img src={props?.data1.bigrams_image} alt="image"></img>
            )}
          </div>
        </div>
      )}
      <br />
      <br />
    </>
  );
};
export default Analysis;
