
import { client } from "../src/vault-client.mjs"
import { VaultClient } from "../src/vault-client.mjs"

describe("vault client", () => {
    
    test("should take the vault url passed via the options parameter", () => {
        const options = {
            vaulturl : "foo"
        }
        expect(client(options).vaulturl).toBe("foo")
    })

    test("should return a VaultClient instance", () => {
        expect(client({})).toBeInstanceOf(VaultClient)
    })
}

)