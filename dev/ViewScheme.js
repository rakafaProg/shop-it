/**
 * ===================================
 * ViewScheme.js
 * created by Rakefet Yifrach 2018
 * ===================================
 * This is a scheme to the angular view directories 
 */

const scheme = {
    admin: {
        createProduct,
        productsListView,
        editProduct
    },
    user: {
        wellcome,
        shopping: {
            shoppingCart,
            productsListView,
            categoriesHeaderView,
            viewSingleProduct
        }, 
        placeOrder: {
            tempRecite, 
            getShippingAndPayment,
            printRecite
        },
        profile: {
            editUserDetails,
            viewPastOrders
        }
    },
    generic: {
        about,
        login,
        signUp : {
            fase1,
            fase2
        },
    }
}