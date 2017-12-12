export const Mutation = `
  input PlayResult {
    success: Boolean
  }

  input SeatInput {
    isAI: Boolean
  }

  type Mutation {
    createRoom(seats: [SeatInput]): Room
    play(roomId: Int, x: Int, y: Int): Room
    join(roomId: Int): Room
  }
`;
