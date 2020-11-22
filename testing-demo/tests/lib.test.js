const lib = require('../lib');

describe('absolute', () => {

    it('Absolute -should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('Absolute -should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    })

    it('Absolute -should return a 0 number if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    })
});
describe('greet', () => {

    it('should return a greeting message', () => {
        const result = lib.greet('Sagar');
       
        expect(result).toContain('Sagar');
    });
});
describe('getCurrencies', () => {

    it('should return a supported Currencies', () => {
        const result = lib.getCurrencies();
       
        expect(result).toContain('USD');
        expect(result).toContain('EUR');

        expect(result).toEqual(expect.arrayContaining(['USD']));
    });
});

describe('getProduct', () => {

    it('should return a product ', () => {
        const result = lib.getProduct(1);
       
       
        //expect(result).toBe({ id: 1, price: 10 });
        //expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ id: 1, price: 10 });
        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', () => {

    it.each([null,0,undefined,NaN,'',false])('should return a Username is falsy', (x) => {
        
        expect(()=> {lib.registerUser(x)}).toThrow();

    });
   it('should return a User ', () => {
        const result = lib.registerUser('Sagar');
       
       
        //expect(result).toBe({ id: 1, price: 10 });
        //expect(result).toEqual({ id: 1, price: 10 });
        expect(result).toMatchObject({ username: 'Sagar'});
        expect(result.id).toBeGreaterThan(0);
    });
   
});