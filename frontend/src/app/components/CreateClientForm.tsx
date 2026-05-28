"use client";

import { useState } from "react";
import { createClient } from "../services/client.service";
import { Client } from "../types/client";

type Props = {
  onCreated: () => void;
};

export default function CreateClientForm({ onCreated }: Props) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
    !name.trim() ||
    !email.trim()
  ) {
    return;
  }

  try {
    const newClient: Omit<Client, "id"> = {
      name,
      email,
    };

    await createClient(newClient);

    setName("");
    setEmail("");

    onCreated();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        className="border p-2"
        placeholder="Client name"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setName(e.target.value)
        }
      />

      <input
        className="border p-2"
        placeholder="Client email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

     <button
  disabled={
    !name.trim() ||
    !email.trim()
  }
  className="bg-black text-white px-4 disabled:opacity-50"
>
  Add
</button>
    </form>
  );
}