import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function App() {
  return (
    <MDBFooter className="bg-white text-center text-white">
      <MDBContainer className="p-4 pb-0">
        <section className="mb-4">
          {/* <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#55acee" }}
            href="https://twitter.com/NitinDw46454591"
            role="button"
          >
            <MDBIcon fab icon="twitter" />
          </MDBBtn> */}

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="https://www.linkedin.com/in/nitin-dwivedi-834972192/"
            role="button"
          >
            <MDBIcon fab icon="linkedin-in" />
          </MDBBtn>

          <MDBBtn
            floating
            className="m-1"
            style={{ backgroundColor: "#333333" }}
            href="https://github.com/NitinDwivedi1"
            role="button"
          >
            <MDBIcon fab icon="github" />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div
        className="text-center bg-dark p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Developed by:
        <a className="text-white" href="https://nitindwivedi1.github.io">
          Nitin Dwivedi
        </a>
      </div>
    </MDBFooter>
  );
}
