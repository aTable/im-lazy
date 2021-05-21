#![feature(proc_macro_hygiene, decl_macro)]

#[macro_use]
extern crate rocket;
extern crate chrono;
use chrono::Local;
use rocket::Request;
use rocket_contrib::json::Json;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use std::path::Path;
use std::time::SystemTime;

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

#[post("/alerts", format = "application/json", data = "<data>")]
fn receive_alert(data: String) -> Json<String> {
    // Create a path to the desired file
    let now = Local::now();
    let filename = now.format("logs/%Y-%m-%d---%H-%M-%S.txt").to_string();
    let path = Path::new(&filename);
    let display = path.display();

    // Open a file in write-only mode, returns `io::Result<File>`
    let mut file = match File::create(&path) {
        Err(why) => panic!("couldn't create {}: {}", display, why),
        Ok(file) => file,
    };

    match file.write_all(data.as_bytes()) {
        Err(why) => panic!("couldn't write to {}: {}", display, why),
        Ok(_) => println!("successfully wrote to {}", display),
    }

    return Json(data.to_string());
}

fn main() {
    rocket::ignite()
        .mount("/", routes![index, health, receive_alert])
        .launch();
}
