import { Link } from "react-router-dom";
import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import "./CompanyCard.css";

function CompanyCard({ companies }) {
  return (
    <ListGroup className="co-list col-md-8">
      {companies.map((co) => (
        <ListGroupItem className="m-2 d-inline-block" key={co.handle}>
          <Link to={`/companies/${co.handle}`} className="co-links">
            <Card>
              <CardBody>
                <CardTitle tag="h5">{co.name}</CardTitle>
                <CardText>{co.description}</CardText>
              </CardBody>
            </Card>
          </Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

export default CompanyCard;
