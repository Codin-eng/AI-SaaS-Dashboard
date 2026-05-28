"use client";

import { useState } from "react";
import { Client } from "../types/client";
import {
  deleteClient,
  updateClient,
} from "../services/client.service";

type Props = {
  clients: Client[];
  refresh: () => void;
};

export default function ClientTable({
  clients,
  refresh,
}: Props) {
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editName, setEditName] =
    useState("");

  const [editEmail, setEditEmail] =
    useState("");

  const handleDelete = async (id: string) => {
    await deleteClient(id);
    refresh();
  };

  if (clients.length === 0) {
    return <p>No clients found</p>;
  }

  return (
    <table className="w-full border">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {clients.map((client) => (
          <tr key={client.id}>
            {/* NAME */}
            <td className="border p-2">
              {editingId === client.id ? (
                <input
                  className="border p-1"
                  value={editName}
                  onChange={(e) =>
                    setEditName(e.target.value)
                  }
                />
              ) : (
                client.name
              )}
            </td>

            {/* EMAIL */}
            <td className="border p-2">
              {editingId === client.id ? (
                <input
                  className="border p-1"
                  value={editEmail}
                  onChange={(e) =>
                    setEditEmail(e.target.value)
                  }
                />
              ) : (
                client.email
              )}
            </td>

            {/* ACTIONS */}
            <td className="border p-2 space-x-2">
              {editingId === client.id ? (
                <>
                  <button
                    className="text-green-600"
                    onClick={async () => {
                      if (
                        !editName.trim() ||
                        !editEmail.trim()
                      ) {
                        return;
                      }

                      await updateClient(
                        client.id,
                        {
                          name: editName,
                          email: editEmail,
                        }
                      );

                      setEditingId(null);
                      refresh();
                    }}
                  >
                    Save
                  </button>

                  <button
                    className="text-gray-500"
                    onClick={() =>
                      setEditingId(null)
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-blue-500"
                    onClick={() => {
                      setEditingId(client.id);
                      setEditName(client.name);
                      setEditEmail(client.email ?? "");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="text-red-500"
                    onClick={() =>
                      handleDelete(client.id)
                    }
                  >
                    Delete
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}