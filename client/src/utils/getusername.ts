export function getUserInfoFromToken(token: string | null) {
  if (!token) return null;

  try {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    const payloadObject = JSON.parse(decodedPayload);

    return {
      username: payloadObject.username,
      userId: payloadObject.userId,
      role: payloadObject.role, 
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

