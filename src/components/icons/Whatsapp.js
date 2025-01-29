"use client"

import React from "react";
import ReactWhatsappButton from "react-whatsapp-button";


function Whatsapp() {
  return (
    <div className="App z-20">
      <ReactWhatsappButton
        countryCode="54"
        phoneNumber="1152267065"
        message="Hola!"
      />
    </div>
  )
}

export default Whatsapp;