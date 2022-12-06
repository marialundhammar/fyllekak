const isolateCityName = (address) => {
    return address.substr(0, address.indexOf(','))
}

export default isolateCityName;
