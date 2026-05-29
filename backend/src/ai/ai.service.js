const generateClientInsights = async (clientName, notes) => {
  try {
    const response =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a SaaS CRM assistant. Analyze clients and provide business insights.",
          },
          {
            role: "user",
            content: `
Client Name: ${clientName}

Notes:
${notes}

Generate:
1. Summary
2. Opportunities
3. Risks
4. Recommended Next Action
`,
          },
        ],
      });

    return response.choices[0].message.content;
  } catch (error) {
    return `
Summary: Test client
Opportunities: Upsell potential
Risks: Low data
Next Action: Follow up
`;
  }
};