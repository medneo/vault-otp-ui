
import {expect, jest} from '@jest/globals';

jest.unstable_mockModule('tiny-json-http', () => {
    return {
        post: jest.fn(),
    }
});

const vaultclient = require('../src/vault-client.mjs')({vaultaddr:'https://secret-manager.medneo.com'})

//import * as client from 'tiny-json-http'

describe("getSecret", ()=>{
    test("should throw an error", async () => {
            await expect(vaultclient.getSecret("some none existing token")).rejects.toThrowError()
    })
})