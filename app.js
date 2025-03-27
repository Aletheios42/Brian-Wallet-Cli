const brianInteraction = async (prompt) => {
  try {
    const requestBody = {
      prompt: prompt,
      address: "0x82879b4DC8BF9fdde23A6A840A5634D0fd96c663",
      chainId: "43114", // Avalanche C-Chain mainnet
      kbId: "public-knowledge-box",
      messages: [
        {
          sender: "user",
          content: prompt,
        },
      ],
    };

    console.log("Enviando solicitud:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://api.brianknows.org/api/v0/agent", {
      method: "POST",
      headers: {
        "X-Brian-Api-Key": "brian_xltVEA5mwVIUA5nob",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    // Leer el texto de la respuesta
    const responseText = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error("Error al analizar la respuesta:", responseText);
      throw new Error(`La API devolvió un JSON inválido: ${responseText}`);
    }

    // Devolver la respuesta independientemente del código de estado
    return responseData;
  } catch (error) {
    // Errores de red u otros errores técnicos
    console.error("Error de conexión con Brian:", error);
    throw error;
  }
};

// Ejemplo de uso con prompt consistente con los parámetros (C-Chain principal de Avalanche)
const main = async () => {
  try {
    const result = await brianInteraction(
      "Transfiere 0.1 AVAX a la dirección 0x739fe9A01B3Fc4a21cA9fd3BB25713Bb33d0c96a en la C-Chain de Avalanche",
    );

    if (result.error) {
      console.log("Respuesta de Brian:", result.error);
      if (result.extractedParams) {
        console.log("Parámetros extraídos:", result.extractedParams);
      }
    } else {
      console.log("Respuesta exitosa de Brian:", result);
    }
  } catch (error) {
    console.error("Error técnico en la llamada:", error.message);
  }
};

// Ejecutar la función principal
main();

// Exportar la función para uso en otros archivos
module.exports = { brianInteraction };
