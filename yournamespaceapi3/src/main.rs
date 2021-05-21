#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;
extern crate chrono;

use chrono::prelude::*;

#[get("/")]
fn index() -> String {
	let utc: DateTime<Utc> = Utc::now();
	return utc.format("%Y-%m-%dT%H:%M:%S").to_string();
}


fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
