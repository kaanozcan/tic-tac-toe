export * from "./Room";
export * from "./Board";
export * from "./Space";
export * from "./Seat";

export const Query = `
 type Query {
   room(id: Int): Room
   rooms: [Room]
 }
`;
