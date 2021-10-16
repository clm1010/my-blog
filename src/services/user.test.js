const user = require("./user")
// @ponicode
describe("user.getUserInfo", () => {
    test("0", async () => {
        await user.getUserInfo("username", "accessdenied4u")
    })

    test("1", async () => {
        await user.getUserInfo("user123", "$p3onyycat")
    })

    test("2", async () => {
        await user.getUserInfo("user123", "accessdenied4u")
    })

    test("3", async () => {
        await user.getUserInfo(123, "!Lov3MyPianoPony")
    })

    test("4", async () => {
        await user.getUserInfo("user_name", "accessdenied4u")
    })

    test("5", async () => {
        await user.getUserInfo(undefined, undefined)
    })
})

// @ponicode
describe("user.deleteUser", () => {
    test("0", async () => {
        await user.deleteUser("user_name")
    })

    test("1", async () => {
        await user.deleteUser("user-name")
    })

    test("2", async () => {
        await user.deleteUser("user123")
    })

    test("3", async () => {
        await user.deleteUser("user name")
    })

    test("4", async () => {
        await user.deleteUser("username")
    })

    test("5", async () => {
        await user.deleteUser(undefined)
    })
})
