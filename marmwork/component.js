function Component(packageJson) {

	this.name = packageJson.name;

	this.packageJson = packageJson;
	this.files = [];

};

module.exports = Component;