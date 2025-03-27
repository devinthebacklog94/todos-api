import { getUserProfile } from "../../src/services/userService";
import UserSchema from "../../src/models/users";
import { UserMockTest } from "../mocks/user"; 

// Mocking findById from Mongoose
jest.mock("../../src/models/users");

describe('Tests in User Service', () => {
    
    afterEach(() => {
        jest.clearAllMocks(); // clean mocks after each test
    });

    test("Should throw an error if id is undefined", async () => {
        await expect(getUserProfile(undefined)).rejects.toThrow("Bad request")
    });

    test("Should throw an error if user does not exists", async () => {
        (UserSchema.findById as jest.Mock).mockResolvedValue(null);

        await expect(getUserProfile("ab34fe2330003")).rejects.toThrow("User not found")
    });


    test('should resturn a user if found', async () => {
        const mockUser = {
            _id: "1234",
            ...UserMockTest,
        };

        // Simulates the user exists
        (UserSchema.findById as jest.Mock).mockResolvedValue(mockUser);

        const result = await getUserProfile("1234");

        expect(result).toEqual(mockUser);
        expect(UserSchema.findById).toHaveBeenCalledWith(mockUser._id);
        expect(UserSchema.findById).toHaveBeenCalledTimes(1);
    })
});



