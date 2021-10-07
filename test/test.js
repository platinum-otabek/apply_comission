const assert = require('assert');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs')
const {equals} = require("validator");
require('dotenv').config()
// test Register New Customer
describe('Register New Customer', () => {
    // check body without fields
    describe('#CheckBody exsisting', () => {
        it('phone_number and is_resident is required ', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/registerNewCustomer`,
                    data: {}
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(error.response.status, 400);
                assert.equal(errors_body.length, 5)
                assert.equal(typeof errors_body, 'object')
                assert.equal(errors_body[0].msg, 'phone_number is required')
                assert.equal(errors_body[2].msg, 'is_resident field is required')
            }
        });
    });
    // check body fields -> phone_number, is_resident, full_name with wrong data
    describe('#Check fields wrong data', () => {
        // check phone number
        it('should phone_number', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/registerNewCustomer`,
                    data: {
                        "phone_number": "e"
                    }
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(errors_body[0].msg, 'phone_number shouldbe +998991234567')
            }
        });
        //check is_resident
        it('should is_resident 1 or 0', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/registerNewCustomer`,
                    data: {
                        "is_resident": "e"
                    }
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(errors_body[2].msg, 'is_resident must be 1 or 0')
            }
        });
        //check full_name
        it('should Full Name\n' +
            '    • Letters only\n' +
            '    • No more than 20 characters\n' +
            '    • Each word in capital letter', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/registerNewCustomer`,
                    data: {
                        "full_name": "e"
                    }
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(errors_body[4].msg, 'full_name must be only letters,max 20 characters, Each word in capital letter')
            }
        });
    })
    //check body wih true data
    describe('#Check fields true data', () => {
        it('should result_message=true, status=200', async () => {
            try {
                let res = await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/registerNewCustomer`,
                    data: {
                        "phone_number": "+998941234567",
                        "is_resident": 1,
                        "full_name": "John Mike"
                    }
                });
                console.log(res.status)
                assert.equal(res.status, 200);
                assert.equal(res.data.success, true)
                assert.notEqual(res.data.user_token, '')
            } catch (error) {
                console.error(error)
            }
        });
    })
});


// test getCustomerImage
describe('Get Customer image', () => {
    // check body without user_token
    describe('#CheckBody exsisting', () => {
        it('##user_token is required ', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/getCustomerImage`,
                    data: {}
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(errors_body[0].msg, 'user_token is required')
            }
        });
    });


    // describe('#Check image resolution,type,size', () => {
    //     it('#image resolution,type,size  ', async () => {
    //
    //         let form = new FormData(); // create FormData
    //         let newFile = await fs.readFileSync(`./test/images/test.png`)
    //         let data = new FormData();
    //         data.append('image', newFile, 'test.png');
    //         try {
    //             await axios({
    //                 method: 'POST',
    //                 url: `${process.env.HTTP_LOCATION}/getCustomerImage`,
    //                 data: form,
    //
    //                 headers: {
    //                     'Content-Type': 'multipart/form-data',
    //                     'Accept-Language': 'en-US,en;q=0.8',
    //                     "user_token": "asdqdqwe",
    //                     ...form.getHeaders()
    //                 },
    //                 contentType: 'multipart/form-data',
    //             });
    //
    //         } catch (e) {
    //             console.log(e)
    //         }
    //
    //
    //     });
    // });

});

//test imageMakeGrayScale
describe('Image Gray Scale', () => {
    //check body without user_token srv_path
    describe('#user_token and srv_path', () => {
        it('should user_token and srv_path', async () => {
            try {
                await axios({
                    method: 'POST',
                    url: `${process.env.HTTP_LOCATION}/imageMakeGrayscale`,
                    data: {}
                });
            } catch (error) {
                let errors_body = error.response.data.errors
                assert.equal(errors_body[0].msg, 'user_token is required')
                assert.equal(errors_body[1].msg, 'image_srv_path is required')
            }
        });
    })
    // check wrong data
    it('should user_token and srv_path wrong data', async () => {
        try {
            let res = await axios({
                method: 'POST',
                url: `${process.env.HTTP_LOCATION}/imageMakeGrayscale`,
                data: {
                    "image_srv_path": "test/images/test.pn"
                },
                headers: {
                    "user_token": "asdqw/123.sdqweq"
                }
            });
            console.log(res)
        } catch (error) {
            let errors_body = error.response.data
            assert.equal(errors_body.err.syscall, 'open')
        }
    });
    //check with true data
    it('should user_token and srv_path true data', async () => {
        try {
            let res = await axios({
                method: 'POST',
                url: `${process.env.HTTP_LOCATION}/imageMakeGrayscale`,
                data: {
                    "image_srv_path": "test/images/test.png"
                },
                headers: {
                    "user_token": "asdqw/123.sdqweq"
                }
            });
            assert.equal(res.data.result_message, 'success')
            assert.equal(res.data.image_res_width, '953')
            assert.equal(res.data.image_res_height, '680')
        } catch (error) {

        }
    });
})



















