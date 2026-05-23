export const personKeys = {
    all: ["persons"] as const,
    detail: (id: string) => ["persons", id] as const,
};
