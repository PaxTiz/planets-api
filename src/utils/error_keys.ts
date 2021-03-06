enum ErrorKeys {
    /** === GENERIC ERRORS KEYS === */
    not_found = 'not_found',
    unauthenticated = 'unauthenticated',
    forbidden = 'forbidden',
    server_error = 'server_error',

    limit_is_not_a_valid_number = 'limit_is_not_a_valid_number',
    offset_is_not_a_valid_number = 'offset_is_not_a_valid_number',

    /** === USERNAME ERRORS KEYS === */
    username_required = 'username_required',
    username_bad_length = 'username_bad_length',
    username_not_found = 'username_not_found',
    username_alredy_in_use = 'username_already_in_use',

    /** === PASSWORD ERRORS KEYS === */
    password_required = 'password_required',
    password_too_small = 'password_too_small',
    password_not_match = 'password_not_match',

    /** === EMAIL ERRORS KEYS === */
    email_invalid = 'email_invalid',
    email_alredy_in_use = 'email_already_in_use',

    /** === USER ERRORS KEYS === */
    user_save_error = 'user_save_error',

    /** === PLANET VIEWS ERRORS KEYS === */
    planet_views_save_error = 'planet_views_save_error',

    /** === PLANETS ERRORS KEYS === */
    planets_middleware_galaxy_boolean = 'planets_middleware_galaxy_boolean',
    planets_find_all_error = 'planets_find_all_error',
    planet_id_missing = 'planet_id_missing',

    /** === QUIZZ ERRORS KEYS === */
    quizz_find_all_error = 'quizz_find_all_error',
    quizz_categories_find_all_error = 'quizz_categories_find_all_error',
}

export default ErrorKeys
