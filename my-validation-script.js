function testJsF(obj) {
	if (obj.name !== "Виктор" || obj.surname !== "Цой") {
		return {name: "Требование", value: "Верните нам Виктора Цоя!"};
	}
	return null;
}

module.exports = {
    testJs: testJsF
};