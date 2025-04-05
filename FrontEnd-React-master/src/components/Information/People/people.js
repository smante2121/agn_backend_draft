import React from "react";
import {MDBRow, MDBCard, MDBCardBody} from "mdbreact";
import Individual from "./individual"
import peoples from './peoples.js'

const TeamPage = () => {
  
  return (
    <MDBCard className="my-5 px-5 pb-1 text-center">
      <MDBCardBody>
        <h2 className="h1-responsive font-weight-bold my-5">
          Our amazing team
        </h2>
        <p className="grey-text w-responsive mx-auto mb-5">
         The AGNDB team is made by Astrophysicists and computer scientists at the University of Miami and at Yale University. Our team of senior and  junior scientists joined their skills to obtain the state of the art catalog of all the known AGN in the Universe.
        </p>

        
        <h3 className="h3-responsive font-weight-bold my-5">Principal Investigators</h3>
        <MDBRow center className="text-md-left">
          {peoples.Professors.map((professor) => (
            <Individual person = {professor} key = {professor.name}/>
          ))}
        </MDBRow>
        
        <h3 className="h3-responsive font-weight-bold my-5">Co-Investigators</h3>
        <MDBRow center className="text-md-left">
          {peoples.Students.map((student) => (
            <Individual person = {student} key = {student.name}/>
          ))}
        </MDBRow>
      </MDBCardBody>
    </MDBCard>
  );
}

export default TeamPage;
