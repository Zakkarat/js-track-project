import React, { useState } from "react";
import { MDBCol } from "mdbreact";
import setValue from "../../helpers/setValue";
import { useRouter } from "next/router";
import RegisterForm from "./RegisterForm";

const Card = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [adress, setAdress] = useState("");
  const [phone, setPhone] = useState("+380");
  const [error, setError] = useState(false);

  const handleValidPhone = (e) => {
    const newPhone = e.target.value;
    if (newPhone.length < 14 && newPhone.length > 3) {
      setValue(e, setPhone);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { target } = e;
    target.disabled = true;
    if([name, password, region, city, adress, phone].every(elem => elem !== "") ) {
      target.disabled = false;
      setError(true);
      return
    }
    await fetch("https://orchclub-ecommerce.herokuapp.com/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password, region, city, adress, phone }),
      credentials: "include",
    }).then(({status}) => {
      if (status === 200) {
        router.replace("/");
      } else {
        target.disabled = false;
        setError(true);
      }
    });
  };

  return (
    <MDBCol lg="6" xl="3">
      <RegisterForm
        name={name}
        setName={setName}
        password={password}
        setPassword={setPassword}
        region={region}
        setRegion={setRegion}
        city={city}
        setCity={setCity}
        adress={adress}
        setAdress={setAdress}
        phone={phone}
        handleValidPhone={handleValidPhone}
        handleSubmit={handleSubmit}
        error={error}
        setError={setError}
      ></RegisterForm>
    </MDBCol>
  );
};

export default Card;
