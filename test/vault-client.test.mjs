
import {expect, jest} from '@jest/globals';

jest.unstable_mockModule('tiny-json-http', () => {
    return {
        post: jest.fn(),
    }
});

const vaultclientmodule = await import('../src/vault-client.mjs')
const vaultclient = vaultclientmodule.default({vaultaddr:'https://secret-manager.medneo.com'})

//import * as client from 'tiny-json-http'

describe("getSecret", ()=>{
    test("should throw an error", async () => {
            await expect(vaultclient.getSecret("some none existing token")).rejects.toThrowError()
    })
})