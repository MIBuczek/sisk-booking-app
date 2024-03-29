enum SAVING_STAGE {
   SUCCESS = 'SUCCESS',
   INITIAL = 'INITIAL',
   ERROR = 'ERROR'
}

enum MODAL_STATE {
   INITIAL = 'INITIAL',
   DISPLAY = 'DISPLAY'
}

enum LOGIN_STATE {
   LOG_IN = 'LOG_IN',
   LOG_OUT = 'LOG_OUT'
}

enum MODAL_TYPES {
   EMPTY = 'EMPTY',
   MESSAGE = 'MESSAGE',
   BOOKINGS = 'BOOKINGS',
   BOOKING_SINGLE_TIME = 'BOOKING_SINGLE_TIME',
   BOOKINGS_STATUS = 'BOOKINGS_STATUS',
   BOOKINGS_CALENDER_STATUS = 'BOOKINGS_CALENDER_STATUS',
   BOOKING_CONFLICTS = 'BOOKING_CONFLICTS',
   LOAD_BOOKINGS = 'LOAD_BOOKINGS',
   AUTO_LOGOUT = 'AUTO_LOGOUT',
   CLIENT = 'CLIENT',
   PDF = 'PDF',
   SUCCESS = 'SUCCESS',
   ERROR = 'ERROR',
   DELETE = 'DELETE'
}

enum USER_STATE {
   GET_USER = 'GET_USER',
   ERROR_USER = 'ERROR_USER'
}

enum CLIENTS_STATE {
   GET_CLIENT = 'GET_CLIENT',
   UPDATE_CLIENT = 'UPDATE_CLIENT',
   ADD_CLIENT = 'ADD_CLIENT',
   DELETE_CLIENT = 'DELETE_CLIENT',
   ERROR_CLIENT = 'ERROR_CLIENT'
}

enum BOOKING_STATE {
   INITIAL_BOOKING = 'INITIAL_BOOKING',
   GET_BOOKING = 'GET_BOOKING',
   UPDATE_BOOKING = 'UPDATE_BOOKING',
   GET_BOOKING_CONFLICTS = 'GET_BOOKING_CONFLICTS',
   CLEAR_BOOKING_CONFLICTS = 'CLEAR_BOOKING_CONFLICTS',
   ADD_BOOKING = 'ADD_BOOKING',
   DELETE_BOOKING = 'DELETE_BOOKING',
   ERROR_BOOKING = 'ERROR_BOOKING'
}

enum BUILDING_STATE {
   GET_BUILDING = 'GET_BUILDING',
   ERROR_BUILDING = 'ERROR_BUILDING'
}

export {
   MODAL_STATE,
   MODAL_TYPES,
   SAVING_STAGE,
   USER_STATE,
   LOGIN_STATE,
   CLIENTS_STATE,
   BOOKING_STATE,
   BUILDING_STATE
};
