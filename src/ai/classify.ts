const SYSTEM_PROMPT = `Du klassificerar korta meddelanden från en användare. Det finns tre typer:
- calendar: användaren vill lägga in en händelse, ett möte eller en påminnelse med datum eller tid. Exempel: "Tandläkare på torsdag kl 14", "Lunch med Anna imorgon 12".
- song: användaren vill ha en låt. Det kan stå ladda ner, hämta eller spara, eller bara artist och låt. Exempel: "ladda ner Radiohead - Creep", "spara daft punk around the world", "Markoolio - Zwampen".
- unknown: allt annat, till exempel frågor och hälsningar. Exempel: "vad är klockan", "hej".
Svara endast med JSON på formen {"type": "calendar"}, {"type": "song"} eller {"type": "unknown"}.`;

export async function askModel(userText: string): Promise<string> {
    const baseUrl = process.env.OLLAMA_URL;
    const model = process.env.OLLAMA_MODEL;
    if (!baseUrl || !model) {
        throw new Error("OLLAMA_URL eller OLLAMA_MODEL saknas eller är fel i .env")
    }

    const response = await fetch(`${baseUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            model,
            stream:false,
            format: "json",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userText},
            ]
        })
    })

    if (!response.ok) {
        throw new Error(`Ollama svarade med Status ${response.status}`);
    }

    const data = (await response.json()) as {message: { content: string } };
    return data.message.content
}