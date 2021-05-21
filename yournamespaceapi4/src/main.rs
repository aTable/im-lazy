#![feature(proc_macro_hygiene, decl_macro)]
#[macro_use] extern crate rocket;
extern crate chrono;
use rand::Rng;
use rocket_contrib::json::Json;

use chrono::prelude::*;

#[get("/")]
fn index() -> Json<u32> {
	let num: u32 = rand::thread_rng().gen_range(0..100);
	return Json(num);
}


fn main() {
    rocket::ignite().mount("/", routes![index]).launch();
}
