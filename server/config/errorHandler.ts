export const handleError = (error: unknown, context: string): never => {
    if (error instanceof Error) {
        throw new Error(`Error fetching ${context}: ${error.message}`);
    } else {
        throw new Error(`Error fetching ${context}`);
    }
}