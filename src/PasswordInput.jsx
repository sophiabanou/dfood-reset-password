

import { useState } from "react";


const OpenEye = () => (
    <svg width={19} height={14} viewBox="0 0 19 14" fill="none">
        <path
            d="M9.49999 9C10.0281 9 10.5346 8.78929 10.908 8.41421C11.2814 8.03914 11.4912 7.53043 11.4912 7C11.4912 6.46957 11.2814 5.96086 10.908 5.58579C10.5346 5.21071 10.0281 5 9.49999 5C8.97189 5 8.46542 5.21071 8.092 5.58579C7.71858 5.96086 7.50879 6.46957 7.50879 7C7.50879 7.53043 7.71858 8.03914 8.092 8.41421C8.46542 8.78929 8.97189 9 9.49999 9Z"
            fill="#B4B9CA"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 7C1.26839 2.943 5.04171 0 9.5 0C13.9583 0 17.7316 2.943 19 7C17.7316 11.057 13.9583 14 9.5 14C5.04171 14 1.26839 11.057 0 7ZM13.4824 7C13.4824 8.06087 13.0628 9.07828 12.316 9.82843C11.5691 10.5786 10.5562 11 9.5 11C8.4438 11 7.43087 10.5786 6.68402 9.82843C5.93718 9.07828 5.51761 8.06087 5.51761 7C5.51761 5.93913 5.93718 4.92172 6.68402 4.17157C7.43087 3.42143 8.4438 3 9.5 3C10.5562 3 11.5691 3.42143 12.316 4.17157C13.0628 4.92172 13.4824 5.93913 13.4824 7Z"
            fill="#B4B9CA"
        />
    </svg>
);

const ClosedEye = () => (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
        <path
            d="M9.34909 9.34895C9.17431 9.53652 8.96355 9.68696 8.72937 9.7913C8.49519 9.89565 8.24239 9.95175 7.98606 9.95628C7.72972 9.9608 7.4751 9.91364 7.23739 9.81763C6.99967 9.72161 6.78373 9.5787 6.60245 9.39741C6.42116 9.21613 6.27825 9.00019 6.18223 8.76247C6.08622 8.52476 6.03906 8.27014 6.04358 8.0138C6.04811 7.75747 6.10421 7.50467 6.20856 7.27049C6.3129 7.03631 6.46334 6.82555 6.65091 6.65077M11.78 11.7799C10.6922 12.609 9.36761 13.0684 8 13.0908C3.54545 13.0908 1 7.99986 1 7.99986C1.79157 6.5247 2.88945 5.23588 4.22 4.21986L11.78 11.7799ZM6.66364 3.06168C7.10167 2.95915 7.55013 2.90789 8 2.90895C12.4545 2.90895 15 7.99986 15 7.99986C14.6137 8.72252 14.153 9.40287 13.6255 10.0299L6.66364 3.06168Z"
            stroke="#B4B9CA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M1 1L15 15"
            stroke="#B4B9CA"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);



const PasswordInput = ({ error, value, onChange, onFocus }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className="field">
            <label className="label" htmlFor="password">
                PASSWORD
            </label>

            {error ? (<p className="errorMessage">{error}</p>) : null}

            <div className="inputBox">
                <div className="inputInnerPassword">
                    <input
                        autoCapitalize="none"
                        className="textInput"
                        value={value}
                        placeholder="123456789"
                        onChange={onChange}
                        onFocus={onFocus}
                        name="password"
                        id="password"
                        type={showPassword ? "text" : "password"}
                    />

                    <button type="button" onClick={handleTogglePassword}>
                        {!showPassword ? <OpenEye /> : <ClosedEye />}
                    </button>
                </div>
            </div>

        </div>
    )
}
export default PasswordInput