const mongoose = require("mongoose")
const { DateTime } = require("luxon")

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, maxLength: 100 },
	family_name: { type: String, required: true, maxLength: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
})

//Virtual for Author's Name
AuthorSchema.virtual("name").get(function () {
	let fullName = ""

	if (this.first_name && this.family_name) {
		fullName = `${this.family_name}, ${this.first_name}`
	}

	return fullName
})

//Virtual for Author's URL
AuthorSchema.virtual("url").get(function () {
	return `/catalog/author/${this._id}`
})

// Virtual for Author date of birth formatted
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
	return this.date_of_birth
		? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
		: ""
})

// Virtual for Author date of death formatted
AuthorSchema.virtual("date_of_death_formatted").get(function () {
	return this.date_of_death
		? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
		: ""
})

// Virtual for Author lifespan formatted
AuthorSchema.virtual("lifespan").get(function () {
	return `${this.date_of_birth_formatted} - ${this.date_of_death_formatted}`
})

// Virtual for date_of_birth_yyyy_mm_dd
AuthorSchema.virtual("date_of_birth_yyyy_mm_dd").get(function () {
	return DateTime.fromJSDate(this.date_of_birth).toISODate()
})

// Virtual for date_of_death_yyyy_mm_dd
AuthorSchema.virtual("date_of_death_yyyy_mm_dd").get(function () {
	return DateTime.fromJSDate(this.date_of_death).toISODate()
})

module.exports = mongoose.model("Author", AuthorSchema)
