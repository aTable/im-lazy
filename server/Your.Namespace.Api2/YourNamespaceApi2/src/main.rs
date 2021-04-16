#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
use rocket_contrib::json::Json;

use rand::Rng;
use serde::{Deserialize, Serialize};
#[derive(Deserialize, Serialize)]
struct User {
    name: String,
}

#[derive(Debug, Deserialize, Serialize)]
enum Health {
    Unknown,
    Healthy,
    Unhealthy,
}

fn init() -> Vec<User> {
    let mut users: Vec<User> = vec![];
    users.push(User {
        name: "Jon Snow".to_string(),
    });
    users.push(User {
        name: "Mr. Bean".to_string(),
    });
    users.push(User {
        name: "Harry Potter".to_string(),
    });
    users.push(User {
        name: "Luke Skywalker".to_string(),
    });
    users.push(User {
        name: "Superman".to_string(),
    });
    users.push(User {
        name: "Hodor".to_string(),
    });
    users.push(User {
        name: "Dora The Explorer".to_string(),
    });
    users.push(User {
        name: "Winnie the Pooh".to_string(),
    });
    users.push(User {
        name: "Mickie Mouse".to_string(),
    });
    users.push(User {
        name: "Ditto".to_string(),
    });
    return users;
}

#[get("/")]
fn index() -> Json<Vec<User>> {
    return Json(init());
}

#[get("/health")]
fn health() -> Json<Health> {
    let num = rand::thread_rng().gen_range(0..100);
    if num < 10 {
        return Json(Health::Unknown);
    } else if num < 50 {
        return Json(Health::Healthy);
    } else {
        return Json(Health::Unhealthy);
    }
}

fn main() {
    rocket::ignite().mount("/", routes![index, health]).launch();
}
