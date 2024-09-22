"use client";

import { FormEvent } from "react";

export default function Content() {
  const transfer = async (e: FormEvent) => {
    const form: HTMLFormElement = document.querySelector(
      "form"
    ) as HTMLFormElement;
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form); // Create a FormData object from the form
    const data = {
      receiver: formData.get("receiver"),
      amount: formData.get("amount"),
    };

    try {
      const res = await fetch("/api/test/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set the Content-Type to JSON
        },
        body: JSON.stringify(data), // Convert the data object to JSON
      });

      const result = await res.json();
      if (result.ok) {
        window.alert(result.message);
      } else {
        window.alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div>
        <h1>Welcome</h1>
        <form onSubmit={(e) => transfer(e)}>
          <div>
            <label htmlFor="receiver">Receiver</label>
            <input type="text" id="receiver" name="receiver" />
          </div>
          <div>
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" name="amount" />
          </div>
          <button type="submit">Transfer</button>
        </form>
      </div>
    </>
  );
}
