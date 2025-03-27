import UserSchema, { User } from "../../src/models/users";
import { UserMock } from "../mocks/user";
import { renewJwtSession, signIn, signUp } from "../../src/services/authService";

const MockToken = "ey09fExample";

// Mocking functions from Mongoose
jest.mock("../../src/models/users");

//Mocking JWT functions
jest.mock("../../src/helpers/jwt", () => ({
    generateJwt: jest.fn(() => MockToken)
}));

describe('Tests in authService', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should throw an error if user already exists', async () => {
        // Mock MongoDB findOne Function to simulate user exists
        (UserSchema.findOne as jest.Mock).mockResolvedValue(UserMock);
        await expect(signUp(UserMock as User)).rejects.toThrow("User already exist");
    });

    test('should throw an error if fields are misising', async () => {
        // Mock MongoDB findOne Function to simulate user exists
        await expect(signUp({name: "", email: "", password: ""} as User)).rejects.toThrow("Fields are missing");
    });

    test('should return object with id and jwt token', async () => {
        (UserSchema.findOne as jest.Mock).mockResolvedValue(null);

        // Simulate UserSchema constructor's returns the mock object from save()
       jest.spyOn(UserSchema, "create")
            .mockImplementation(
                jest.fn().mockResolvedValueOnce({
                    id: "12345",
                    name: "John",
                    email: "john@example.com"
                })
            )

        const userCreated = await signUp({
            name: "John",
            email: "john@example.com",
            password: "12345"
        } as User);
        
        
        expect(userCreated).toEqual({
            id: "12345",
            token: expect.any(String)
        })
    });

    test('should throw error message if user not exists', async () => { 
        (UserSchema.findOne as jest.Mock).mockResolvedValue(null);
        await expect(signIn(
            "user@test.com",
            "1234554")).rejects.toThrow("User not found")
    });

    test('should throw error message if password not match', async () => {
        UserMock.password = "$2b$10$.hj1aeHD6Q0J7newqg5JGOzfyF0grXLJLxSAlzgZwvxmxCjbRA7Fy";
        (UserSchema.findOne as jest.Mock).mockResolvedValue(UserMock);

        await expect(signIn(
            "crventra@test.com",
            "1234554")).rejects.toThrow("Incorrect password")
    });

    test('should signIn succesfully', async () => {
        UserMock.password = "$2b$10$BHBLzVd3Bj64kJIYfNEgPeZ2oFve.Izc152kA..CVyWT6NRl6r.wq";
        (UserSchema.findOne as jest.Mock).mockResolvedValue(UserMock);

        const result = await signIn("crventra@test.com","123abc");
        expect(result).toEqual(expect.objectContaining({id: expect.any(String),token: expect.any(String)}))
    });

    test('should throw an error message if Id is not provided in renewSession', async () => {
        await expect(renewJwtSession(undefined)).rejects.toThrow("Error getting UID")
    });

    test('should throw an error message if User is not found', async () => {
        (UserSchema.findById as jest.Mock).mockResolvedValue(null);

        await expect(renewJwtSession("1234")).rejects.toThrow("Error getting user name")
    });

    test('should  succesfully renew the session', async () => {
        (UserSchema.findById as jest.Mock).mockResolvedValue(UserMock);
        const id = "1234";
        const result = await renewJwtSession(id);

        await expect(result).toEqual(MockToken);
    });
})