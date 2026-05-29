"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getClients } from "../services/client.service";
import ClientTable from "../components/ClientTable";
import CreateClientForm from "../components/CreateClientForm";
import { Client } from "../types/client";

export default function DashboardPage() {
 const router = useRouter();
 const [authChecked, setAuthChecked] = useState(false);
 const [clients, setClients] = useState<Client[]>([]);
 const [loading, setLoading] = useState(true);

const [insights, setInsights] = useState<string>("");
const [aiLoading, setAiLoading] = useState(false);
const [selectedClient, setSelectedClient] = useState<Client | null>(null);

 const fetchClients = useCallback(async () => {
   setLoading(true);
   try {
     const data = await getClients();
     setClients(data);
   } catch (err) {
     console.error(err);
   } finally {
     setLoading(false);
   }
 }, []);

 useEffect(() => {
   const token = localStorage.getItem("token");
   if (!token) {
     router.replace("/login");
   } else {
     setAuthChecked(true);
   }
 }, [router]);

 useEffect(() => {
   if (authChecked) fetchClients();
 }, [authChecked, fetchClients]);

 if (!authChecked) return null;

 const generateInsights = async (client: Client) => {
  try {
    setAiLoading(true);

    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/api/ai/insights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        clientName: client.name,
        notes: client.notes,
      }),
    });

    const data = await res.json();

    setInsights(data.insights);
    setSelectedClient(client);
  } catch (err) {
    console.error(err);
  } finally {
    setAiLoading(false);
  }
};
 
 return (
   <div>
     <h1 className="text-2xl font-bold mb-4">Clients</h1>
     <CreateClientForm onCreated={fetchClients} />
     {loading ? (
       <p>Loading...</p>
     ) : (
      <ClientTable
  clients={clients}
  refresh={fetchClients}
  onGenerateAI={generateInsights}
/>
     )}
   </div>
 );
}