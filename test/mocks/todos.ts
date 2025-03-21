export const TodoMock = {
    title: "TEST_1: Todo Test",
    notes: "Example note for ToDo",
    status: "ON_HOLD"
}

export const TodoMockCreated = {
    ok: expect.any(Boolean),
    created: expect.objectContaining({
        title: expect.any(String),
        notes: expect.any(String),
        status: expect.any(String),
        user: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        id: expect.any(String)
    })
}


export const TodoMockById = {
    title: expect.any(String),
    notes: expect.any(String),
    status: expect.any(String),
    user: expect.any(String),
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
    id: expect.any(String)
}