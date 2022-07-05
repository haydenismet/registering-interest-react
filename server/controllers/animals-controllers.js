/*
-finish routes
- adding other paths to search by, or fetch all in your routes is also possible and can filter in front end?
- might add a path for get users instead of just / 


- express req, res, next
Req gets sent
We check req with js if needed 
We send response status and data with it
Next() is to stop it hanging and timeout and move to other funcs 

- express res.status 
Is express based method
Gives us a code status to send back to browser
https://expressjs.com/
http://qnimate.com/express-js-middleware-tutorial/

- module exports and require 
Require is nodejs 
Import is es6 
Can swap it to all use import but leave for now 
Just gives you file access
Don’t get confused with export default in react
Can look later if needed 
 
 -MVC pattern 
File pattern to break up code to model, view, controller and user 

-express validator
- finish validations
-normalize email method (check other methods)
https://github.com/validatorjs/validator.js#sanitizers
https://express-validator.github.io/docs/sanitization.html

*/

//this follows the MVC architecture, so animals-routes contains the mapping and paths and animals-controllers contains the functions for what the route should be looking for (what the endpoint should specify, i.e ID);

// to generate a UUID for each POST request. Diff versions contain diff params. v4 contains timestamp.
const { v4: uuidv4 } = require("uuid");

//adding express validator here to give the validation fields set in animal-routes the opportunity to validate.
const { validationResult } = require("express-validator");

//imports our class that extends the Error method to make our custom error handling without repeating code.
const HttpError = require("../error_model/http-error");

let DUMMY_ANIMALS = [
  {
    id: "2472060c-9b9c-4074-8d61-c7555a19dbe2",
    animal_specific: {
      type: "dog",
      name: "Justin Von",
      size: "small",
      age: 1,
      breed: "labrador",
      img_urls: [
        "/System/innovate_green.wrl.cmdf",
        "/selinux/roi.vxml.uvu",
        "/var/mail/buckinghamshire_applications.igx.qbo",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "94bea2e0-fa12-4c5f-bd59-2be6be8c153c",
      location: "286 Schoen Roads",
      available: true,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Urban Outfitters",
      organisation_picture: "/home/initiatives.lbd.uvvm",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "7ce7047f-5d87-4943-be7d-76625d5ab1da",
    animal_specific: {
      type: "dog",
      name: "Devin Kautzer",
      size: "large",
      age: 2,
      breed: "siamese",
      img_urls: ["/var/mail/time_frame_small.wax.mpc"],
      gender: "female",
    },
    availability_details: {
      creator_id: "092edaf9-ec11-466d-855d-7c6fe66a18bc",
      location: "5062 Lockman Extension",
      available: true,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Avaya",
      organisation_picture: "/var/log/computer_credit_deposit.sfv.pas",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "ca3f0a8e-b376-437f-88d6-fd39b77e0ab6",
    animal_specific: {
      type: "cat",
      name: "Naomi Heidenreich",
      size: "large",
      age: 2,
      breed: "maine coone",
      img_urls: ["/opt/sbin/green_grid_enabled_services.cbt.gram"],
      gender: "male",
    },
    availability_details: {
      creator_id: "e7598aae-4612-421f-a22a-2c6288935c43",
      location: "472 Hayes Turnpike",
      available: true,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "H&R Block",
      organisation_picture: "/proc/virtual_monitored_utah.yang.lostxml",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "bc4ffa16-24a5-4785-8402-ddd8e99522d9",
    animal_specific: {
      type: "dog",
      name: "Nichole Jast",
      size: "small",
      age: 13,
      breed: "poodle",
      img_urls: [
        "/usr/sbin/rss_sports.gpx.abw",
        "/etc/mail/copying_initiatives_concrete.tmo.hqx",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "1b93b15c-3f90-478d-9e3c-6fba2954d4e8",
      location: "4267 Boehm Corners",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Tractor Supply",
      organisation_picture: "/net/payment_ivory.inkml.chrt",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "e1dc2f02-0134-4227-acf5-64adfb6f69d9",
    animal_specific: {
      type: "cat",
      name: "Paul Crooks",
      size: "small",
      age: 13,
      breed: "beagle",
      img_urls: [
        "/usr/lib/application_sdd_drive.portpkg.pl",
        "/opt/include/up_sized_killer.avi.swa",
        "/opt/bin/toolset.msl.styl",
        "/var/log/infrastructure_car.svgz.sea",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "70bf2768-50af-46de-9420-4ed3dad79f3a",
      location: "258 Stewart Branch",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Energy Future Holdings",
      organisation_picture: "/var/spool/optical.txd.pwn",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "04323d9b-a625-40fc-b30d-a7034b292702",
    animal_specific: {
      type: "dog",
      name: "Jessie Baumbach",
      size: "medium",
      age: 8,
      breed: "maine coone",
      img_urls: [
        "/System/rial_wireless_liaison.xdssc.xsl",
        "/etc/namedb/user_facing.oti.lrf",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "4827a847-ec88-4561-87cc-4772f0a8cb90",
      location: "03886 Willms Shore",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Frontier Communications",
      organisation_picture: "/sbin/markets.spp.spot",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "87277df6-b04d-4e27-93da-6d5991fa3ef4",
    animal_specific: {
      type: "dog",
      name: "Holly Kerluke",
      size: "large",
      age: 11,
      breed: "poodle",
      img_urls: [
        "/lib/protocol_moderator.pnm.eps",
        "/opt/include/cross_platform_deposit_digital.kwt.dot",
        "/usr/libexec/analyst.mpy.pfa",
        "/usr/src/card_loan_executive.sdd.uvx",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "b2860660-2b8d-4945-9e9e-f7507ac81264",
      location: "910 Legros Causeway",
      available: false,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "BorgWarner",
      organisation_picture: "/var/spool/scale_out_of_the_box_plastic.dwg.uvx",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "2cc2843f-9c48-494f-8619-42fe1655c2b1",
    animal_specific: {
      type: "dog",
      name: "Allen Nienow",
      size: "medium",
      age: 2,
      breed: "maine coone",
      img_urls: [
        "/usr/libexec/loan_exploit_grey.ccxml.midi",
        "/usr/optical_tactics_dominican.uvt.gmx",
        "/etc/mail/array_index_viral.sil.uvvh",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "121c8082-c84c-4835-8e51-64097bdde9cc",
      location: "9554 Lindgren Street",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Packaging Corp. of America",
      organisation_picture: "/opt/sbin/quantifying.tfi.sdc",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "a027485d-652e-4cc4-b532-d7dfc36963d0",
    animal_specific: {
      type: "cat",
      name: "Freda Morissette",
      size: "small",
      age: 7,
      breed: "labrador",
      img_urls: [
        "/lost+found/transmitter_handmade_services.xltm.dd2",
        "/opt/bin/indigo_garden.wmv.metalink",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "66ae0883-aa6c-49b3-babe-f54b6c262124",
      location: "6754 Turcotte Centers",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "R.R. Donnelley & Sons",
      organisation_picture: "/etc/periodic/baby_multi_byte.azf.ogg",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "f5c69b81-3f3a-4af4-aeb9-c6da19adc768",
    animal_specific: {
      type: "cat",
      name: "Bonnie Altenwerth",
      size: "small",
      age: "12",
      breed: "siamese",
      img_urls: [
        "/bin/electronics_zambia.wg.jpgv",
        "/usr/libdata/supervisor.ics.sdd",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "4ac68ce0-5e25-4982-95fe-33f6a277f6f4",
      location: "46927 Hoeger Squares",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Nasdaq OMX Group",
      organisation_picture: "/etc/periodic/account_home_quantifying.fh5.cml",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "c50da793-cadc-4cea-9bc2-68b49c87f524",
    animal_specific: {
      type: "cat",
      name: "Al Towne",
      size: "small",
      age: 2,
      breed: "poodle",
      img_urls: ["/lib/generic_avon_legacy.plb.atomsvc"],
      gender: "male",
    },
    availability_details: {
      creator_id: "6c2dd2a5-0e11-4f1b-ba2c-cd0dd918db53",
      location: "1932 Barrows Way",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Textron",
      organisation_picture: "/home/pennsylvania_customized.gim.psd",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "ddfca227-4caf-42b2-a78e-700d6cb5db08",
    animal_specific: {
      type: "cat",
      name: "Dawn Reinger",
      size: "large",
      age: 11,
      breed: "maine coone",
      img_urls: [
        "/home/user/dir/lock_practical_tuna.otg.gex",
        "/usr/src/investment.wmf.esa",
        "/var/log/glens_legacy_computer.musicxml.gph",
        "/private/var/sms.roff.vsd",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "6ae11f17-8a05-463c-b995-f1bb1dc7b988",
      location: "300 Amber Shore",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Gap",
      organisation_picture: "/var/mail/payment_olive_som.plc.mvb",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "84f922a6-2a38-4d5d-b2c2-8776f436a84a",
    animal_specific: {
      type: "cat",
      name: "Norman Krajcik",
      size: "large",
      age: 5,
      breed: "poodle",
      img_urls: [
        "/usr/obj/officer_reduced.mus.odf",
        "/opt/sbin/card_kong_north.mrc.x3d",
        "/var/log/avon_matrix_infomediaries.clp.ktx",
        "/usr/obj/metrics_applications.nb.gif",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "0dbb3586-b1b5-488f-a851-b9c6652d355a",
      location: "76812 Greenfelder Shores",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Lennox International",
      organisation_picture: "/sbin/secondary_factors_user_facing.wvx.cab",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "df73da72-5a57-495c-9d0c-1d0bf9445b93",
    animal_specific: {
      type: "dog",
      name: "Allison Hagenes",
      size: "medium",
      age: 13,
      breed: "siamese",
      img_urls: ["/usr/ports/applications.emf.grxml"],
      gender: "female",
    },
    availability_details: {
      creator_id: "1bfac24c-d928-4fd5-b251-96628402e33b",
      location: "95246 Belle Grove",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Timken",
      organisation_picture: "/boot/metrics_circuit.uvvx.sdd",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "b2f66d22-7b42-47d3-85d0-3c11e4585ca6",
    animal_specific: {
      type: "cat",
      name: "Adrian Pfeffer",
      size: "small",
      age: 7,
      breed: "maine coone",
      img_urls: ["/usr/local/bin/ram_sdd_bedfordshire.ami.exi"],
      gender: "male",
    },
    availability_details: {
      creator_id: "f3a19827-d69a-4fdc-ae03-60e2ae251050",
      location: "60860 Hartmann Street",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "TIAA-CREF",
      organisation_picture: "/Applications/vista.dtshd.rld",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "19f97751-fc30-4e67-8c16-0e808d0f7a62",
    animal_specific: {
      type: "cat",
      name: "Kurt Upton",
      size: "medium",
      age: 13,
      breed: "siamese",
      img_urls: [
        "/boot/optimal_copy_solution.mfm.smil",
        "/usr/sbin/parse_markets.lbe.wmlc",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "7ac8ae1a-cbef-4a98-9839-57c61ba89723",
      location: "058 Reilly Fall",
      available: true,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Ocwen Financial",
      organisation_picture: "/mnt/transmitter_bricks_and_clicks.ink.unityweb",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "3e796d4d-92e6-4139-baa2-9cdd3945fde5",
    animal_specific: {
      type: "dog",
      name: "Spencer Koepp",
      size: "large",
      age: 12,
      breed: "siamese",
      img_urls: [
        "/var/spool/withdrawal.str.pgp",
        "/opt/sbin/carolina.sfd-hdstx.fh7",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "0f7af0a6-e1d1-41ff-b289-a60aa9792a4c",
      location: "411 Thompson Spring",
      available: true,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Public Storage",
      organisation_picture: "/etc/defaults/niches.fh.xhtml",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "522d15fb-350b-46cb-8f53-d67863fd2a63",
    animal_specific: {
      type: "dog",
      name: "Ron Parker",
      size: "small",
      age: 7,
      breed: "poodle",
      img_urls: [
        "/etc/mail/azure.oti.itp",
        "/usr/obj/customer_focused.ttf.susp",
        "/var/spool/loan_tertiary_pennsylvania.spl.kmz",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "8300e128-4d2a-4504-a686-64f30bb43bbc",
      location: "125 Dietrich Common",
      available: true,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Roundy's",
      organisation_picture:
        "/private/var/backing_back_end_methodologies.dic.ts",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "af4a7972-9e49-40d4-b9b3-af7ec6ac7532",
    animal_specific: {
      type: "dog",
      name: "Linda Bartoletti",
      size: "large",
      age: 10,
      breed: "poodle",
      img_urls: [
        "/root/whiteboard_architect_forks.igl.pfb",
        "/boot/tennessee.gxt.ait",
        "/boot/sausages_paradigms.sus.mobi",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "4120f8d3-895c-4d3d-ae94-8579bc663ade",
      location: "94716 Randy Inlet",
      available: true,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "CVS Health",
      organisation_picture:
        "/rescue/associate_quantifying_optical.listafp.mpkg",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "ce2e23f4-8791-4f9d-829a-35dc706d97ff",
    animal_specific: {
      type: "dog",
      name: "Cesar O'Keefe",
      size: "large",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/lost+found/payment.7z.xbap",
        "/etc/ppp/iranian_override.m3a.pct",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "76dfc0dc-30b3-4876-a6bd-fe62176ccf1e",
      location: "01985 Ivy Trail",
      available: false,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Eversource Energy",
      organisation_picture: "/mnt/manat_set.tpt.zir",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "e4a4fa4b-6c6b-4700-bd39-2a16904548b5",
    animal_specific: {
      type: "cat",
      name: "Corey Kunze",
      size: "small",
      age: 3,
      breed: "siamese",
      img_urls: [
        "/lost+found/transmitting_integration.i2g.kml",
        "/Network/unit_fork.dot.mpm",
        "/rescue/payment_beauty_planner.z3.uvh",
        "/usr/libdata/tools_disintermediate.lasxml.buffer",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "697b7244-72c6-4e5c-bb4f-e474d1abf24d",
      location: "25112 Santina Cove",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Outerwall",
      organisation_picture: "/usr/share/pre_emptive_website_com.ogv.xht",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "b319a819-17cb-486b-96f1-a8bdd2aace3e",
    animal_specific: {
      type: "dog",
      name: "Nicholas Renner",
      size: "small",
      age: 12,
      breed: "labrador",
      img_urls: [
        "/etc/defaults/quantifying.scss.srx",
        "/var/log/liaison.xslt.ptid",
        "/opt/bin/multi_tasking_producer.otf.mdp",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "306032e9-7158-4e2f-82b0-4a92f017017f",
      location: "15952 Waters Hollow",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Peter Kiewit Sons'",
      organisation_picture: "/usr/compress.evy.mxml",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "1dd4924d-2a03-4c5e-81c6-ddb3e18337b2",
    animal_specific: {
      type: "cat",
      name: "Leroy Kassulke",
      size: "large",
      age: 1,
      breed: "maine coone",
      img_urls: [
        "/selinux/tools.war.csh",
        "/usr/include/massachusetts_deliver_tools.cdx.dxf",
        "/etc/namedb/texas.cbr.ssml",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "6098b32f-c90b-4790-9b2d-9fb085eac71d",
      location: "2418 Kovacek Dam",
      available: true,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "NBTY",
      organisation_picture: "/srv/new_blue_web_enabled.midi.manifest",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "085398d7-33be-4f55-aef3-922076729cee",
    animal_specific: {
      type: "dog",
      name: "Rolando Terry",
      size: "small",
      age: 12,
      breed: "siamese",
      img_urls: [
        "/usr/include/rubber.in.ei6",
        "/usr/src/scalable_technologies_vermont.cbt.jlt",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "5c6aeab2-ff53-414c-ad21-342a533393c7",
      location: "669 Rashawn Walk",
      available: false,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "BorgWarner",
      organisation_picture: "/srv/deposit_png.gre.tsd",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "73543c42-43fb-4175-ac7c-7360bada4509",
    animal_specific: {
      type: "cat",
      name: "Andy Crist",
      size: "medium",
      age: 14,
      breed: "maine coone",
      img_urls: [
        "/selinux/systemic_sql.apr.g3",
        "/System/e_enable_driver_e_services.uvvu.markdown",
        "/tmp/mississippi_payment.tr.nlu",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "d8377a15-6b4e-4342-b3d4-68bc8934a759",
      location: "8631 Shields Prairie",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Lincoln National",
      organisation_picture: "/etc/mail/pizza.rtx.lnk",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "No other pets",
    },
  },
  {
    id: "cd97dab1-1d99-42a3-8ddf-6de87d4e118a",
    animal_specific: {
      type: "dog",
      name: "Sammy Schmitt",
      size: "small",
      age: 14,
      breed: "poodle",
      img_urls: [
        "/usr/libexec/louisiana_ball.sldm.cmc",
        "/home/dynamic_vortals_strategist.vox.mads",
        "/Applications/metal.ods.cdbcmsg",
        "/lib/ghana_bike.oda.wpl",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "1b5bae61-c3f3-429c-8257-ce0be46bae3e",
      location: "434 Laurel Meadows",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Scripps Networks Interactive",
      organisation_picture: "/usr/sbin/firmware_parsing.acc.dmp",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "760dd478-02d2-4faf-816b-5c099875d01a",
    animal_specific: {
      type: "dog",
      name: "Bill Graham",
      size: "small",
      age: 8,
      breed: "maine coone",
      img_urls: [
        "/Network/encoding.m13.coffee",
        "/boot/defaults/product.aac.mc1",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "8cb9e729-3f83-4b7d-a55a-4b10aa6fc4ef",
      location: "5854 Kacie Ranch",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Nexeo Solutions Holdings",
      organisation_picture: "/net/keyboard_directives.n-gage.mp2a",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "acbd5701-8250-4904-a23a-9889ae1165d2",
    animal_specific: {
      type: "cat",
      name: "Kimberly Emard",
      size: "small",
      age: 9,
      breed: "poodle",
      img_urls: [
        "/usr/lib/refined_sql_euro.smzip.ms",
        "/private/dynamic_wooden_connecting.msl.rdf",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "c4b0bed4-8b46-4d2b-8fcd-46c6480d88af",
      location: "40423 Hillard Mountain",
      available: true,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Silgan Holdings",
      organisation_picture: "/tmp/organized_teal_pizza.ez2.mpp",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "No other pets",
    },
  },
  {
    id: "422860e1-ac8d-40ae-9b0c-4742c66db9d6",
    animal_specific: {
      type: "dog",
      name: "Karl Hamill",
      size: "small",
      age: 6,
      breed: "maine coone",
      img_urls: ["/home/user/human_soap.asf.qxd"],
      gender: "female",
    },
    availability_details: {
      creator_id: "69875f19-e19c-4576-9349-90c6f77cf77e",
      location: "1451 Alex Ports",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Dollar General",
      organisation_picture: "/boot/sleek.mc1.cdx",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "7b55e9c1-1c06-486f-9982-e7e4cbaa86b9",
    animal_specific: {
      type: "dog",
      name: "Darin Simonis",
      size: "small",
      age: 5,
      breed: "poodle",
      img_urls: [
        "/usr/src/white.icm.ai",
        "/usr/local/src/input.wmlsc.pcl",
        "/Library/landing_tasty.z1.cdbcmsg",
        "/tmp/somali.xvml.aam",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "9fdc95de-aca7-407f-9cbe-0228b3e5e857",
      location: "4200 Gerlach Plains",
      available: false,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Broadcom",
      organisation_picture: "/private/mesh_creek_http.wpd.mpm",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "f8511381-9d27-43cb-ad06-9de81e7b2cde",
    animal_specific: {
      type: "cat",
      name: "Greg Schmitt",
      size: "small",
      age: 8,
      breed: "maine coone",
      img_urls: ["/rescue/eyeballs.woff2.gdl", "/home/bus.pdf.jsx"],
      gender: "male",
    },
    availability_details: {
      creator_id: "2927988f-b0fc-4336-bc6a-bb7b98dd034d",
      location: "2315 Satterfield Grove",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Anthem",
      organisation_picture: "/selinux/chilean.wg.sdkm",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "67cb47b5-969a-4567-9375-652ce0be84ff",
    animal_specific: {
      type: "dog",
      name: "Billy O'Reilly",
      size: "large",
      age: 11,
      breed: "labrador",
      img_urls: ["/var/ib.ext.z6", "/sbin/massachusetts_peso_wooden.cba.conf"],
      gender: "male",
    },
    availability_details: {
      creator_id: "8b621a0c-c1e4-4b19-ab5f-4735517079dd",
      location: "83748 Dora Glens",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Helmerich & Payne",
      organisation_picture: "/rescue/buckinghamshire_crescent_savings.xlm.xdp",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "b7794d61-43ab-48b4-ae4b-e3d18c633738",
    animal_specific: {
      type: "dog",
      name: "Helen Nienow",
      size: "large",
      age: 11,
      breed: "maine coone",
      img_urls: [
        "/boot/empower.cxt.aam",
        "/System/spring_bandwidth_matrix.skp.xlt",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "bd5aec78-7737-4fc6-b6e0-6a60f4ac84f2",
      location: "52611 Hans Knolls",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Time Warner Cable",
      organisation_picture: "/private/var/rubber.oas.afm",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "b28c5529-731f-4f72-8426-56482384d78b",
    animal_specific: {
      type: "cat",
      name: "Leona Schuster",
      size: "small",
      age: 12,
      breed: "labrador",
      img_urls: [
        "/home/ftp_system.eps.img",
        "/etc/ppp/dynamic.vcx.kia",
        "/usr/include/teal_payment.odt.caf",
        "/dev/withdrawal.w3d.dic",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "d3b60d9d-8291-49b8-b12b-7f5ed22aaa82",
      location: "10877 Jacobs Village",
      available: true,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Waste Connections",
      organisation_picture: "/private/tmp/unleash.dtshd.rtf",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "24479c61-f5d9-4847-ba16-c6aa957ee997",
    animal_specific: {
      type: "cat",
      name: "Ginger Osinski",
      size: "large",
      age: 3,
      breed: "labrador",
      img_urls: ["/sbin/practical.gnumeric.eol", "/root/morocco_euro.srx.cu"],
      gender: "female",
    },
    availability_details: {
      creator_id: "d26ac631-66ca-430e-bac0-59697c221d4b",
      location: "1362 Micah Ridge",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Alere",
      organisation_picture: "/opt/lib/out_of_the_box.xar.text",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "89d67e25-d3ad-4c7f-8cdb-b36687f8256a",
    animal_specific: {
      type: "cat",
      name: "Arlene Hilpert",
      size: "large",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/usr/libexec/consultant.mathml.ppsm",
        "/Applications/market.chm.wps",
        "/usr/obj/keyboard.cmp.ac",
        "/tmp/target.emf.scq",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "6fa26fbf-d3b2-4fc3-a06e-295b62829627",
      location: "24430 Ziemann Island",
      available: true,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "American Express",
      organisation_picture: "/var/spool/granite_neural_net_intelligent.cat.sub",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "No other pets",
    },
  },
  {
    id: "5bac506a-5af8-4641-aabe-cc47fece9625",
    animal_specific: {
      type: "dog",
      name: "Milton Becker",
      size: "medium",
      age: 5,
      breed: "labrador",
      img_urls: [
        "/boot/defaults/interface_streamline_texas.djvu.au",
        "/var/wireless_fish.c.xltm",
        "/tmp/24_7.air.mk3d",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "d1ce7e2f-e74e-42f9-82b0-7885882707c1",
      location: "226 Koss Estates",
      available: true,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Bon-Ton Stores",
      organisation_picture: "/usr/local/src/bike_1080p_black.z6.mid",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "4f1f40aa-5664-424a-b5b1-c181d29182ce",
    animal_specific: {
      type: "cat",
      name: "Judy Jakubowski",
      size: "medium",
      age: 12,
      breed: "beagle",
      img_urls: ["/var/haptic_white_invoice.wmz.kar"],
      gender: "female",
    },
    availability_details: {
      creator_id: "906bfdad-2195-4ef6-a838-04d5172034e5",
      location: "18419 Mya Plaza",
      available: true,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Brunswick",
      organisation_picture: "/usr/local/src/synergistic_card.gv.markdown",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "a1bbfcba-6a8a-41b6-82be-193dd45cb614",
    animal_specific: {
      type: "cat",
      name: "Hannah Fritsch",
      size: "large",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/usr/bin/calculate_account.fnc.bmp",
        "/System/kentucky.odc.tr",
        "/net/bedfordshire_optimization_jewelery.txd.zirz",
        "/usr/sbin/deposit_bypassing.dvi.7z",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "c6cc30eb-4f47-4b6a-9ae7-5b4e8d6fd26d",
      location: "65999 Rosella Route",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "CH2M Hill",
      organisation_picture: "/var/mail/profit_focused.xdw.sit",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "94f31ba5-982f-4912-a974-96a526ec5be5",
    animal_specific: {
      type: "dog",
      name: "Faye Brekke",
      size: "small",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/private/tmp/baby.scss.apk",
        "/usr/local/bin/afghani_bus_sms.mwf.gif",
        "/lost+found/grocery_clothing_bypassing.nsc.ser",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "06148aee-018a-4c56-93a4-92cd7800b571",
      location: "8057 Spencer Stream",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "General Dynamics",
      organisation_picture: "/usr/bin/plain_bus_intelligent.sm.xhtml",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "7512504a-e3fb-47bd-802a-8abc32026240",
    animal_specific: {
      type: "dog",
      name: "Travis Pouros",
      size: "small",
      age: 11,
      breed: "labrador",
      img_urls: [
        "/net/dynamic.tar.sgi",
        "/srv/orange_red_buckinghamshire.ssf.txt",
        "/usr/bin/rico.msm.tiff",
        "/sys/alabama_pizza.eot.xlw",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "ae26bc81-e5d6-4700-882f-a2823c9ead4f",
      location: "355 Aylin Neck",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Chiquita Brands International",
      organisation_picture: "/etc/defaults/chicken.asc.rs",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "No other pets",
    },
  },
  {
    id: "49d9f049-5de5-4790-91d2-52e726503f66",
    animal_specific: {
      type: "cat",
      name: "Mack Beier",
      size: "medium",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/var/yp/united_plastic.kar.pot",
        "/rescue/ram_programming_bypassing.ini.sv4crc",
        "/usr/obj/jersey_ib.mar.lbe",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "bbc9f100-bd6b-4afc-99ee-1c3efd01895b",
      location: "675 Jarrell Rapids",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Graham Holdings",
      organisation_picture: "/net/composite_concrete.fgd.mpg4",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "c38cbf4e-abf7-42c9-ab65-3dbcc87799f4",
    animal_specific: {
      type: "dog",
      name: "Leo Larkin",
      size: "small",
      age: 8,
      breed: "siamese",
      img_urls: [
        "/home/user/dir/practical_investment_pa_anga.sis.sxi",
        "/selinux/blue_e_markets_navigating.sgl.litcoffee",
        "/usr/libexec/heuristic_matrix_direct.msp.ktz",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "549b1ae8-1372-47ee-b741-a6e3658777cb",
      location: "913 Adams Tunnel",
      available: false,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Belk",
      organisation_picture: "/etc/defaults/borders_awesome.ttc.hvd",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "2f1a6c7a-e121-4a4f-ac77-8aa11cee61f6",
    animal_specific: {
      type: "cat",
      name: "Gregg Boyle",
      size: "medium",
      age: 11,
      breed: "siamese",
      img_urls: [
        "/usr/include/bacon_regional_usb.doc.onetmp",
        "/opt/lib/loan_keyboard_us.ait.mpm",
        "/root/bluetooth.mads.nnd",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "a1db0f28-d0f2-4874-ac91-1f2f312c046b",
      location: "14072 Ryan Via",
      available: true,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Skechers U.S.A.",
      organisation_picture: "/var/yp/fantastic.dvb.sql",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "d7ca1eae-79a8-48be-9165-e1fe84a7e7fc",
    animal_specific: {
      type: "cat",
      name: "Clarence Friesen",
      size: "medium",
      age: 7,
      breed: "labrador",
      img_urls: [
        "/etc/namedb/account_road_grocery.cmc.pcap",
        "/etc/mail/computers.mpga.uvvh",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "a1cec29b-6b2e-4217-8ac7-e59ed1eb26cd",
      location: "804 Lafayette Junction",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Enable Midstream Partners",
      organisation_picture: "/sys/mindshare_deliverables.ext.fst",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "f714cbf8-4123-406b-ba52-b88a01ff5319",
    animal_specific: {
      type: "cat",
      name: "Merle Bergstrom",
      size: "small",
      age: 14,
      breed: "beagle",
      img_urls: [
        "/usr/share/coordinator.curl.otf",
        "/Applications/missouri_internal_cross_platform.sub.coffee",
        "/opt/share/pants.es3.cmp",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "be58b602-59ea-41b5-bcc3-6f0e2ca1a6ea",
      location: "280 Jones Ford",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Oshkosh",
      organisation_picture: "/usr/src/envisioneer_identity_usb.taglet.cxx",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "5d64e25e-6cee-4584-907b-5e103b3ec567",
    animal_specific: {
      type: "dog",
      name: "Kelly Rath",
      size: "small",
      age: 4,
      breed: "maine coone",
      img_urls: ["/usr/local/src/bluetooth.kml.stc", "/proc/deposit.s3m.ustar"],
      gender: "male",
    },
    availability_details: {
      creator_id: "c06283a4-6260-438c-8277-235d22548088",
      location: "314 Stehr Estates",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Jones Financial",
      organisation_picture: "/usr/include/lime_beauty_automotive.sxw.yin",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "33902d8b-3a30-487a-bffa-1f152410bb38",
    animal_specific: {
      type: "cat",
      name: "Francis Auer",
      size: "medium",
      age: 6,
      breed: "siamese",
      img_urls: ["/usr/lib/account_strategist_dinar.xlw.mfm"],
      gender: "male",
    },
    availability_details: {
      creator_id: "bc2e4da3-29ef-489a-bb81-4c25266116b4",
      location: "688 Stacy Stream",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Cerner",
      organisation_picture: "/var/tmp/new.rcprofile.wpd",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "3f78760d-de76-40b7-9645-07a73f33a996",
    animal_specific: {
      type: "cat",
      name: "Randal Beatty",
      size: "large",
      age: 2,
      breed: "maine coone",
      img_urls: [
        "/var/log/stravenue_tenge.txt.edx",
        "/selinux/reboot_coordinator.sisx.xlsm",
        "/usr/lib/innovate.doc.fh5",
        "/usr/src/nigeria_radical_market.fst.wri",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "6b7018ad-bb74-41b9-8707-a95334c7230b",
      location: "722 Eryn Locks",
      available: true,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Occidental Petroleum",
      organisation_picture: "/usr/include/crest_turkey.mesh.luac",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "46515394-98d8-42ee-bc81-4ba4d1ecbb73",
    animal_specific: {
      type: "dog",
      name: "Lillian Lueilwitz",
      size: "large",
      age: 11,
      breed: "poodle",
      img_urls: [
        "/srv/deliverables_sleek.bmi.ots",
        "/Users/white.dvi.bcpio",
        "/proc/visualize.gdl.mov",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "b1a5d5d9-42d5-4727-8485-16d0499818d9",
      location: "0465 Olin Course",
      available: true,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "McCormick",
      organisation_picture: "/tmp/e_tailers.cc.nlu",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "3a7587cd-09d6-4066-a221-8b13d06a197e",
    animal_specific: {
      type: "dog",
      name: "Teresa Kessler",
      size: "medium",
      age: 4,
      breed: "siamese",
      img_urls: [
        "/private/content.asx.scq",
        "/usr/libdata/overriding_mission_critical.vxml.ppsm",
        "/usr/libexec/optical_cotton_hawaii.srx.text",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "200c8e6d-316a-42c0-973e-67ad4a0c4ba8",
      location: "57861 Glover Club",
      available: true,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Flowserve",
      organisation_picture: "/dev/avon_money.acu.c4p",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "No other pets",
    },
  },
  {
    id: "bdb9b02e-6cc8-4031-bb40-e84c5d8db112",
    animal_specific: {
      type: "cat",
      name: "Brittany Schiller",
      size: "small",
      age: 12,
      breed: "poodle",
      img_urls: [
        "/usr/share/orchid_chips.rmp.sc",
        "/var/tmp/iterate.pgm.tei",
        "/usr/sbin/pizza_avon_tcp.wax.cdmia",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "f0a1c850-0d07-40eb-8dc9-4e8589cc1b36",
      location: "759 Brakus Courts",
      available: true,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "DISH Network",
      organisation_picture: "/etc/ppp/agp_auxiliary.csp.shf",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "06db2de1-6e00-4194-a1fc-9649318254b0",
    animal_specific: {
      type: "cat",
      name: "Sophia Leffler",
      size: "medium",
      age: 14,
      breed: "poodle",
      img_urls: [
        "/usr/local/bin/future.ott.wmx",
        "/usr/obj/skyway_expanded.odg.icc",
        "/usr/local/bin/attitude_oriented.dwf.rnc",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "58fa809d-830d-43ca-add1-f33575890fc3",
      location: "61138 Afton Circles",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Parker-Hannifin",
      organisation_picture: "/home/intuitive.aas.mpy",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "41b1d69c-1129-4cea-a5b6-980bf9ab0779",
    animal_specific: {
      type: "dog",
      name: "Maryann Hackett",
      size: "large",
      age: 7,
      breed: "poodle",
      img_urls: [
        "/root/washington.ris.pptx",
        "/mnt/west_synthesize_tactics.uvva.mesh",
        "/tmp/gb.uvz.ram",
        "/etc/namedb/focused.in.less",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "1117ccd7-ac72-4b60-8489-7a358d11a206",
      location: "642 Rice Fields",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "American Airlines Group",
      organisation_picture: "/usr/local/bin/music_divide_republic.uri.wdp",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "6f46f518-dfe4-421c-bc5f-5f9b56a20d04",
    animal_specific: {
      type: "dog",
      name: "Kristopher Monahan",
      size: "medium",
      age: 2,
      breed: "siamese",
      img_urls: [
        "/private/tmp/orange_executive_24.msi.7z",
        "/usr/libdata/sql_frictionless_cotton.csp.json5",
        "/opt/bin/leading_edge.jlt.z5",
        "/opt/music_viral_deposit.std.book",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "54edb504-3780-4326-8dd9-5a9b46efcbf0",
      location: "918 Jenkins Glens",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Dentsply Sirona",
      organisation_picture: "/usr/local/src/neutral.pcl.uvvm",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "6371961f-e948-4e4f-b755-64b811572f3b",
    animal_specific: {
      type: "dog",
      name: "Percy Howe",
      size: "small",
      age: 4,
      breed: "siamese",
      img_urls: [
        "/etc/helena_systematic_sdr.odc.sema",
        "/home/user/dir/e_services_calculate.gca.hvp",
        "/usr/ports/account_loan.xvm.cdf",
        "/usr/sbin/e_markets_seamless.f77.uvvp",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "accaafe6-4809-4b7c-b019-ab8f9a96d5d9",
      location: "035 Kelton Motorway",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "QEP Resources",
      organisation_picture: "/sys/indexing.aiff.utz",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "faa242a3-d425-43b0-b669-86c890cc44ab",
    animal_specific: {
      type: "cat",
      name: "Freddie Monahan",
      size: "large",
      age: 9,
      breed: "maine coone",
      img_urls: [
        "/sbin/neural.lua.json",
        "/boot/synthesize_quantifying.p.styl",
        "/opt/include/application_sas.ez.mbox",
        "/root/lanka_panel_village.map.xls",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "04e34093-d081-41bb-b0c2-caea8eaf75ac",
      location: "80757 Emerson Port",
      available: true,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Alaska Air Group",
      organisation_picture: "/sbin/rss_antillian.atomsvc.gqf",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "d97a22b6-80a5-4f71-85fc-f8d80b4f7e68",
    animal_specific: {
      type: "dog",
      name: "Daniel Boyle",
      size: "medium",
      age: 7,
      breed: "poodle",
      img_urls: [
        "/boot/defaults/direct_consultant_hierarchy.ecelp9600.rpm",
        "/usr/local/bin/viral_brand.gqf.xap",
        "/usr/local/bin/minor_auto_program.bmi.mft",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "b75aae9f-7666-4880-a5f8-5346ef9b18a0",
      location: "88632 Earl Trail",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Emerson Electric",
      organisation_picture: "/usr/libdata/automotive_user_friendly.x32.plb",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "af915a23-2137-4824-9154-d35094ce5d32",
    animal_specific: {
      type: "cat",
      name: "Elijah Conn",
      size: "small",
      age: 13,
      breed: "poodle",
      img_urls: [
        "/usr/bin/copying_redefine_coordinator.iota.luac",
        "/proc/principal_steel.cpt.p7r",
        "/usr/libexec/manager_money_pizza.lrf.umj",
        "/usr/local/src/tennessee_evolve_neural_net.atx.json",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "c50e0bdd-00cb-4aad-873a-8d664fcbfa7c",
      location: "5625 Margarita Crossing",
      available: false,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Spirit AeroSystems Holdings",
      organisation_picture: "/usr/src/microchip_framework_optical.dsc.xlsx",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "bcd5feb7-8fde-41e2-b9f1-869e3056f334",
    animal_specific: {
      type: "cat",
      name: "Dan Conn",
      size: "small",
      age: 9,
      breed: "beagle",
      img_urls: [
        "/usr/src/real_time_services.iota.log",
        "/usr/sbin/innovate_table.wbmp.ggb",
        "/usr/share/compressing_maryland.osf.ggb",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "37f9a86e-b03a-4f55-9609-a0207b9ed3f7",
      location: "524 Carlotta Knolls",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Old Dominion Freight Line",
      organisation_picture: "/var/best_of_breed.ktz.potm",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "fa9e2cd0-5fb4-403c-a08a-30cb9979422a",
    animal_specific: {
      type: "cat",
      name: "Nichole Hauck",
      size: "large",
      age: 7,
      breed: "maine coone",
      img_urls: [
        "/Applications/refined_metal_killer.gv.xdp",
        "/usr/sbin/customer.blb.txt",
        "/usr/obj/producer_array_roads.css.gex",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "5bdf04cf-deff-4d4d-8f2b-1f1b2583cb69",
      location: "951 Carroll Garden",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "American Axle & Manufacturing",
      organisation_picture: "/opt/bin/pizza_planner_overriding.et3.mid",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "c791566d-c67b-422a-bf5c-db5da8d4db79",
    animal_specific: {
      type: "dog",
      name: "Morris Daugherty",
      size: "large",
      age: 8,
      breed: "siamese",
      img_urls: [
        "/rescue/matrix_home.ts.rsd",
        "/mnt/mission_generic.sxd.esa",
        "/root/architect_research_avon.php.ifb",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "aa575d19-99a3-424c-bc92-1c7d9706573b",
      location: "55323 Nicola Dale",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Blackstone Group",
      organisation_picture: "/usr/ports/web_ariary_maryland.hps.tcl",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "dd08d114-5f9d-45e3-9fdf-0fe5f6c52a20",
    animal_specific: {
      type: "cat",
      name: "Leonard Cormier",
      size: "large",
      age: 12,
      breed: "labrador",
      img_urls: [
        "/etc/ppp/distributed.mwf.wm",
        "/opt/lib/books_primary_fresh.mseq.roa",
        "/rescue/quantifying_back_end.xdm.cst",
        "/lost+found/solid.mbk.m13",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "eb6de949-4511-49b0-a3c0-642e434d0b8a",
      location: "3970 Monahan Glens",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Norfolk Southern",
      organisation_picture: "/proc/practical_structure.smi.ltf",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "936a521a-5049-4986-b91a-856fff298dd1",
    animal_specific: {
      type: "dog",
      name: "Frances Runte",
      size: "large",
      age: 8,
      breed: "labrador",
      img_urls: [
        "/usr/fresh.ddd.thmx",
        "/tmp/freeway_blue.pqa.mp4s",
        "/usr/bin/payment_new_partnerships.xltm.blorb",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "2a2f301a-e969-4e09-981c-20f40f0da8a2",
      location: "0170 Dickens Route",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Penske Automotive Group",
      organisation_picture: "/selinux/account.psd.man",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "No other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "21696608-5b02-4992-8e9c-f6c8db899555",
    animal_specific: {
      type: "dog",
      name: "Jimmy Ondricka",
      size: "large",
      age: 5,
      breed: "labrador",
      img_urls: [
        "/var/mail/frozen_ubiquitous_uniform.wmls.ra",
        "/private/architect_evolve.pbm.sid",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "a5f47daa-2900-4c86-84ec-24cf6e784b58",
      location: "36242 Brekke Neck",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "CSX",
      organisation_picture: "/tmp/concrete_front_end_persevering.dtd.jade",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "7fff24d8-49e3-419f-8a49-3550665911b6",
    animal_specific: {
      type: "dog",
      name: "Vera Ankunding",
      size: "small",
      age: 3,
      breed: "beagle",
      img_urls: ["/var/log/pixel_digital_synthesizing.nb.iges"],
      gender: "female",
    },
    availability_details: {
      creator_id: "7ec7da8d-02e2-4db3-830b-b6a4c2723879",
      location: "262 Lowe Stream",
      available: true,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Selective Insurance Group",
      organisation_picture: "/usr/obj/back_end.ami.kwt",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "3f9b98eb-052b-488a-9e64-4b8eafaf9fdf",
    animal_specific: {
      type: "dog",
      name: "Ricardo Donnelly",
      size: "small",
      age: 12,
      breed: "siamese",
      img_urls: [
        "/etc/croatia_neural.pcurl.ppd",
        "/bin/account_implement.xop.qxt",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "73de4cab-7b7e-4572-a67a-3e1100a16539",
      location: "41162 Raven Divide",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "TRW Automotive Holdings",
      organisation_picture: "/dev/cross_platform.list.xltm",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "d4f67675-7d61-4c10-a989-88a301429667",
    animal_specific: {
      type: "dog",
      name: "Pat Borer",
      size: "large",
      age: 5,
      breed: "maine coone",
      img_urls: ["/tmp/synergy.xaml.m3u8"],
      gender: "male",
    },
    availability_details: {
      creator_id: "5e429f4f-4d23-4e68-aa79-98107ab7ca87",
      location: "91117 Bartoletti Drives",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Walgreens",
      organisation_picture: "/etc/periodic/partnerships.grxml.musicxml",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "a69f5a35-4114-4bac-816d-598f2e25ed9a",
    animal_specific: {
      type: "dog",
      name: "Bertha Gusikowski",
      size: "large",
      age: 5,
      breed: "maine coone",
      img_urls: [
        "/Network/account.odb.twd",
        "/usr/X11R6/compress_movies_bhutan.xhvml.irp",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "018c36fe-d4f2-4873-8874-2b0ae9499fe5",
      location: "2660 Graham Ferry",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Freeport-McMoRan",
      organisation_picture: "/var/spool/program_multimedia.nb.f",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "2aa88aaf-578f-4e67-9925-9bf80b5570dd",
    animal_specific: {
      type: "cat",
      name: "Tommie Marks",
      size: "large",
      age: 8,
      breed: "labrador",
      img_urls: [
        "/usr/libexec/legacy_tuna_focused.wspolicy.gramps",
        "/sbin/bedfordshire.srt.html",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "cba5d40e-4231-41d7-a2d6-cfab94c9f55c",
      location: "940 Ansel Roads",
      available: true,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "NextEra Energy",
      organisation_picture: "/etc/defaults/silver.sxd.mpn",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "No other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "659441b5-e09d-464f-994c-464121240621",
    animal_specific: {
      type: "dog",
      name: "Cecilia Sawayn",
      size: "medium",
      age: 4,
      breed: "poodle",
      img_urls: ["/net/transmitting_middleware_wooden.rep.ami"],
      gender: "female",
    },
    availability_details: {
      creator_id: "1a7091e7-f19e-485e-a7ea-77eb850318b0",
      location: "561 Boyer Branch",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "FMC Technologies",
      organisation_picture: "/net/payment_connecting_asymmetric.qxl.mpt",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "690be063-1cd4-4dbe-8045-e3c7119ce8a1",
    animal_specific: {
      type: "cat",
      name: "Lora Armstrong",
      size: "large",
      age: 11,
      breed: "siamese",
      img_urls: [
        "/private/var/georgia_seamless_beauty.odg.fg5",
        "/opt/include/district_clothing_loan.dssc.mlp",
        "/proc/alley.html.dfac",
        "/usr/obj/islands.xlf.smv",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "d7449372-6942-401f-bdf0-1da589ec4fba",
      location: "347 Ford Road",
      available: true,
      foster: false,
      adopt: true,
      reserved: false,
      organisation_name: "Valero Energy",
      organisation_picture: "/Library/extensible.stylus.pls",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "e9cb740e-1987-4198-b9a8-5d4fb4e1752c",
    animal_specific: {
      type: "cat",
      name: "Barry Hagenes",
      size: "medium",
      age: 7,
      breed: "siamese",
      img_urls: ["/etc/namedb/falls_georgia_online.nfo.wpd"],
      gender: "male",
    },
    availability_details: {
      creator_id: "e2ecd696-81ed-4605-b52b-33e93353e28c",
      location: "6199 Torp Park",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Merck",
      organisation_picture: "/Network/maroon_borders.unityweb.wmf",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "e5573d3c-79e4-4ced-b8c6-82d4e04dd457",
    animal_specific: {
      type: "cat",
      name: "Lucy Satterfield",
      size: "medium",
      age: 4,
      breed: "maine coone",
      img_urls: ["/usr/libdata/ford_afghani.tga.clkw"],
      gender: "male",
    },
    availability_details: {
      creator_id: "2dbb7e32-f390-4181-ae23-e8055bcfb395",
      location: "9244 Streich Run",
      available: true,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Hartford Financial Services Group",
      organisation_picture: "/media/buckinghamshire.cmx.semd",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "3e184a47-3633-480e-8f73-15284a00aceb",
    animal_specific: {
      type: "dog",
      name: "Gloria Welch",
      size: "large",
      age: 12,
      breed: "poodle",
      img_urls: [
        "/usr/src/gloves_incubate.bdm.sc",
        "/usr/obj/way_dakota_blue.sema.mpp",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "46b9f3c8-8015-458b-89bb-0b8ae653c174",
      location: "913 Emil Flat",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Torchmark",
      organisation_picture: "/tmp/unbranded_research_calculating.vst.hjson",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "efe5efa4-f891-4593-8f55-c382cc8eaeff",
    animal_specific: {
      type: "cat",
      name: "Dominick Reichert",
      size: "large",
      age: 12,
      breed: "maine coone",
      img_urls: ["/usr/sbin/colon.vss.rm"],
      gender: "male",
    },
    availability_details: {
      creator_id: "c642e49e-f54b-4bb2-a352-095bb33e3f5d",
      location: "9738 Mossie Motorway",
      available: true,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Fiserv",
      organisation_picture: "/proc/relationships_networks.jpgv.sldx",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "6b2133a7-23b5-4d61-ba18-08508733d72e",
    animal_specific: {
      type: "dog",
      name: "Melvin Kautzer",
      size: "small",
      age: 2,
      breed: "poodle",
      img_urls: [
        "/private/vertical_monitor.h263.jlt",
        "/usr/X11R6/clothing_roads.chat.obj",
        "/etc/ppp/georgia_payment.nzb.oprc",
        "/home/copying_auxiliary_payment.gsheet.stc",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "cb0ebf4e-563b-4142-8dec-f25b3600a1d5",
      location: "3718 Wilkinson Expressway",
      available: true,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Crown Castle International",
      organisation_picture: "/System/chicken.qwd.potm",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "ab42379b-6604-4ec7-af2b-00510eb54d59",
    animal_specific: {
      type: "dog",
      name: "Fredrick Kihn",
      size: "large",
      age: 5,
      breed: "maine coone",
      img_urls: [
        "/usr/libexec/federation_engine_berkshire.mus.hps",
        "/dev/iowa_liaison.ulx.udeb",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "0a7ee8a3-6cb0-493b-a224-024c1eed1ed1",
      location: "3335 Blair Meadow",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "KLA-Tencor",
      organisation_picture:
        "/var/frictionless_handcrafted_content_based.itp.stw",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "2b791147-f0f7-4516-a48f-e4c6c922e8a3",
    animal_specific: {
      type: "dog",
      name: "Angel Kovacek",
      size: "large",
      age: 2,
      breed: "maine coone",
      img_urls: ["/System/ai_car.ssf.azw"],
      gender: "male",
    },
    availability_details: {
      creator_id: "3b54c038-1f14-4404-91c3-b20f6bf9919a",
      location: "7014 Tatyana Forest",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Zoetis",
      organisation_picture: "/etc/ppp/reverse_engineered_navigate.pml.prc",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "9bf5f0ad-0be6-4211-b0d2-5d06817c1de2",
    animal_specific: {
      type: "cat",
      name: "Lorenzo Cremin",
      size: "large",
      age: 2,
      breed: "beagle",
      img_urls: [
        "/etc/periodic/blockchains_faroe.xer.ogg",
        "/opt/sbin/plains_pants_trail.conf.oa2",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "de4827d2-a24b-401b-a6f6-69a7afcf2cc7",
      location: "11177 Nils Brooks",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Facebook",
      organisation_picture: "/var/mail/dynamic_fields.wma.hlp",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "6e9e05fe-d3b8-48e8-b9b5-d66d33f2d7a3",
    animal_specific: {
      type: "dog",
      name: "Everett Abernathy",
      size: "large",
      age: 5,
      breed: "maine coone",
      img_urls: [
        "/etc/ppp/array_table_parallelism.xspf.fdf",
        "/home/beac.csp.tar",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "16c055cf-721a-47ec-ac82-783dcc270fbb",
      location: "444 Madge Plaza",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Cablevision Systems",
      organisation_picture: "/boot/handmade_soft.odf.vrml",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "7416dbb0-fb11-4e26-9961-34f843268d13",
    animal_specific: {
      type: "dog",
      name: "Edith Heidenreich",
      size: "small",
      age: 4,
      breed: "labrador",
      img_urls: [
        "/etc/defaults/forward.rm.dcr",
        "/usr/local/bin/administrator.sil.ivu",
        "/lost+found/purple_microchip.sass.lzh",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "f4b0acbb-ba3a-4f60-812b-81d4ba70824d",
      location: "52362 Sedrick Courts",
      available: true,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Cliffs Natural Resources",
      organisation_picture:
        "/boot/defaults/interfaces_programming_index.xpi.sdkm",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "14c66a3c-84ec-4f94-bc17-50004f9a8064",
    animal_specific: {
      type: "cat",
      name: "Darryl Miller",
      size: "medium",
      age: 1,
      breed: "poodle",
      img_urls: [
        "/usr/libdata/incredible_burundi_synergies.iso.onepkg",
        "/boot/defaults/vermont_bacon.pls.mfm",
        "/var/ville_dobra_regional.npx.cgm",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "b0b11621-e9c1-44e0-9252-bf965ca61503",
      location: "8855 Koss Lane",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "American Airlines Group",
      organisation_picture: "/usr/ports/multi_byte.m4u.ma",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "1210fbfb-7261-4b37-837d-47f66fe561a2",
    animal_specific: {
      type: "cat",
      name: "Karl Keeling",
      size: "medium",
      age: 6,
      breed: "labrador",
      img_urls: ["/usr/bin/user.xltm.odm"],
      gender: "male",
    },
    availability_details: {
      creator_id: "6675e85c-d10c-4d13-b1ed-1afb07512916",
      location: "02127 Senger Falls",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Jarden",
      organisation_picture: "/usr/specialist_web_platforms.sgi.7z",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "3ff01935-a25f-4fa3-a26d-a5856e6995a2",
    animal_specific: {
      type: "cat",
      name: "Lowell Lueilwitz",
      size: "large",
      age: 9,
      breed: "beagle",
      img_urls: [
        "/var/ivory_rubber.xap.cil",
        "/home/user/dir/regional.fcdt.xdssc",
        "/tmp/forward.texinfo.qam",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "d4feecf8-3dbb-4b0d-a309-266ccabf4c47",
      location: "89294 Nigel Ford",
      available: false,
      foster: true,
      adopt: true,
      reserved: false,
      organisation_name: "Ameriprise Financial",
      organisation_picture: "/media/deliver_wooden_organic.wbxml.pkpass",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "b3094738-656f-4e59-bb1b-9b96f613bf34",
    animal_specific: {
      type: "cat",
      name: "Garry Treutel",
      size: "small",
      age: 5,
      breed: "maine coone",
      img_urls: [
        "/usr/local/bin/kentucky_associate.apk.dssc",
        "/usr/lib/officer_synergy_synthesize.ulx.ram",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "9e037398-8a5f-46cc-b61e-10c88ca46d96",
      location: "02805 Sporer Street",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Eversource Energy",
      organisation_picture: "/opt/include/navigate_cultivate_fresh.oprc.mads",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "4806125f-2de8-48af-bd23-6ff83c9a3a32",
    animal_specific: {
      type: "dog",
      name: "Cameron Spinka",
      size: "large",
      age: 2,
      breed: "poodle",
      img_urls: ["/var/assurance_colon.vcf.gim"],
      gender: "male",
    },
    availability_details: {
      creator_id: "7de7c435-49e0-4cfb-8738-a8f2dde3149b",
      location: "508 Octavia Crest",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "Regeneron Pharmaceuticals",
      organisation_picture: "/usr/lib/tunnel_steel_frozen.rnc.uvvm",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "d8c71408-c145-43c5-81ac-52703a9bb1b4",
    animal_specific: {
      type: "dog",
      name: "Steve Keebler",
      size: "large",
      age: 3,
      breed: "beagle",
      img_urls: [
        "/usr/sbin/even_keeled.dis.cdmio",
        "/opt/sbin/architecture_awesome_multi_byte.webm.vtt",
        "/etc/periodic/metal_buckinghamshire_transmitting.dtb.otg",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "bed03005-0a0b-457f-9c5f-445118bfba1a",
      location: "04988 Ebba Roads",
      available: false,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Adams Resources & Energy",
      organisation_picture: "/rescue/franc_bypassing_blue.xar.boz",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers other pets",
      other_cats: "No other pets",
    },
  },
  {
    id: "ee533c44-b971-4f4f-9e95-ecf80054e854",
    animal_specific: {
      type: "dog",
      name: "Bradford Dibbert",
      size: "large",
      age: 13,
      breed: "siamese",
      img_urls: [
        "/var/log/morph_krona.vor.avi",
        "/var/mail/designer_paradigm_matrix.sda.ipk",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "c613f5dd-d4fb-44bd-8c35-121c6f2ec574",
      location: "0809 Yost Falls",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Alleghany",
      organisation_picture: "/Applications/indigo_small_agent.pic.cif",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "efd96273-bc42-479a-be51-aefe0370e3cd",
    animal_specific: {
      type: "cat",
      name: "Lee Hodkiewicz",
      size: "small",
      age: 9,
      breed: "siamese",
      img_urls: ["/usr/ports/pre_emptive_arizona_track.dvi.azw"],
      gender: "female",
    },
    availability_details: {
      creator_id: "cc871023-976a-49f6-bace-9616a22fde19",
      location: "008 Skiles Shoals",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Anixter International",
      organisation_picture: "/usr/supply_chains.pac.knp",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "0eda7039-1db2-4cf3-93d9-621104d896e8",
    animal_specific: {
      type: "cat",
      name: "Joanna Beahan",
      size: "small",
      age: 10,
      breed: "siamese",
      img_urls: ["/usr/local/bin/invoice.mads.hpid"],
      gender: "male",
    },
    availability_details: {
      creator_id: "2a71877d-66ec-4a81-8e7a-0fc2f425b261",
      location: "10403 Johanna Trace",
      available: false,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "Huntington Bancshares",
      organisation_picture: "/usr/local/src/wireless_soap.wsdl.mp4a",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "No other pets",
    },
  },
  {
    id: "f2242fe0-689e-4232-bc9f-236cf8ba3d91",
    animal_specific: {
      type: "cat",
      name: "Darla O'Keefe",
      size: "small",
      age: 5,
      breed: "siamese",
      img_urls: ["/opt/include/plastic_rhode_intelligent.xslt.mts"],
      gender: "male",
    },
    availability_details: {
      creator_id: "39d80214-9093-4d4a-8a7e-904611e50173",
      location: "107 Runolfsdottir Fords",
      available: false,
      foster: true,
      adopt: false,
      reserved: false,
      organisation_name: "A-Mark Precious Metals",
      organisation_picture: "/lib/redundant_landing_gloves.cbz.mp4",
    },
    animal_suitability: {
      children: "12-15",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "22643e1e-857c-432e-8805-9823fddb0be3",
    animal_specific: {
      type: "cat",
      name: "Tiffany Hoeger",
      size: "medium",
      age: 5,
      breed: "beagle",
      img_urls: [
        "/boot/defaults/florida_1080p.cbz.pfx",
        "/opt/bin/up_personal_programming.aso.pptm",
        "/Library/executive_bluetooth.z2.me",
        "/etc/mail/deliverables_microchip_connecting.gram.yin",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "31d01337-8795-473c-9e53-1e175053b85c",
      location: "382 Wisoky Mountain",
      available: true,
      foster: true,
      adopt: false,
      reserved: true,
      organisation_name: "Harsco",
      organisation_picture: "/opt/include/cambridgeshire.txt.qxb",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "fedab7f4-ad5c-45b5-a9a2-d2d642644b4c",
    animal_specific: {
      type: "cat",
      name: "Nathan Ledner",
      size: "medium",
      age: 8,
      breed: "siamese",
      img_urls: ["/usr/bin/keyboard.sm.esf"],
      gender: "male",
    },
    availability_details: {
      creator_id: "9630ae26-40d7-4f2b-8dad-00c85de723c0",
      location: "1467 D'Amore Ports",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Sears Holdings",
      organisation_picture: "/usr/local/src/ftp_thx.pbd.c4d",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "2d97f1e7-0e26-41cc-a343-9ea34b8d1e7b",
    animal_specific: {
      type: "dog",
      name: "Blake Buckridge",
      size: "medium",
      age: 10,
      breed: "siamese",
      img_urls: ["/net/gold.wcm.nlu", "/lib/world_class.evy.ear"],
      gender: "male",
    },
    availability_details: {
      creator_id: "212a9c83-5d8b-4c81-a4e3-1f6ae592fc98",
      location: "067 Pablo Glens",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "H&R Block",
      organisation_picture: "/net/dynamic.wpl.mjp2",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "3ca45183-d722-44dc-b928-061eaf810b9f",
    animal_specific: {
      type: "dog",
      name: "Eugene Lebsack",
      size: "large",
      age: 2,
      breed: "labrador",
      img_urls: [
        "/home/user/dir/portals.ots.zir",
        "/usr/bin/virtual.igm.sass",
        "/usr/ports/parse_quantify.str.kar",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "102aacb8-6dbd-4570-959a-b6e1caecba27",
      location: "93139 Farrell Summit",
      available: false,
      foster: false,
      adopt: false,
      reserved: false,
      organisation_name: "Visteon",
      organisation_picture: "/private/tmp/com_nebraska.onepkg.rq",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be with other dogs",
      other_cats: "Prefers other pets",
    },
  },
  {
    id: "d949921f-8b9b-4b60-bc42-0155451604d6",
    animal_specific: {
      type: "dog",
      name: "Laura O'Kon",
      size: "medium",
      age: 3,
      breed: "siamese",
      img_urls: [
        "/lost+found/challenge.m2v.igx",
        "/sbin/solid_health_internet.eml.odc",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "fd5d7ea3-a969-403a-a5a5-985da768dd59",
      location: "4796 Briana Meadow",
      available: false,
      foster: false,
      adopt: true,
      reserved: true,
      organisation_name: "Celgene",
      organisation_picture: "/sys/methodology_invoice_legacy.mpga.gml",
    },
    animal_suitability: {
      children: "Adult only home",
      other_dogs: "Prefers to be only dog",
      other_cats: "Prefers to be only cat",
    },
  },
  {
    id: "00dc00ea-9101-45e0-b1e5-5d4b2a02e7b4",
    animal_specific: {
      type: "cat",
      name: "Yvonne Nolan",
      size: "large",
      age: 1,
      breed: "labrador",
      img_urls: [
        "/Users/quality_investment_frozen.wbmp.xfdf",
        "/tmp/parsing_intelligent.odft.twd",
        "/usr/libexec/http_parse_pizza.lvp.rcprofile",
      ],
      gender: "male",
    },
    availability_details: {
      creator_id: "52125ac5-5807-4384-b7dd-b8c2f8d1b1f4",
      location: "4324 Timmothy Neck",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Precision Castparts",
      organisation_picture: "/boot/index_parse.ncx.sdw",
    },
    animal_suitability: {
      children: "1-5",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "1af299e3-ac94-426e-b31c-b2b53e5b4e68",
    animal_specific: {
      type: "cat",
      name: "Victoria Dibbert",
      size: "small",
      age: 13,
      breed: "maine coone",
      img_urls: ["/var/log/jamaican_borders_withdrawal.pfx.pdf"],
      gender: "female",
    },
    availability_details: {
      creator_id: "8d1d814f-ae3e-4432-87c3-d7ccb7fa3cc8",
      location: "65063 Sterling Centers",
      available: true,
      foster: true,
      adopt: true,
      reserved: true,
      organisation_name: "AmTrust Financial Services",
      organisation_picture: "/usr/local/src/oro_soft_dollar.cif.cdmic",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "No other pets",
      other_cats: "Prefers to be with other cats",
    },
  },
  {
    id: "38331e35-adb0-4e4d-aed0-822f6ac4416c",
    animal_specific: {
      type: "dog",
      name: "Esther Stracke",
      size: "large",
      age: 10,
      breed: "labrador",
      img_urls: [
        "/var/mail/maryland.fcs.wdb",
        "/bin/berkshire_soft_hard.mxml.fzs",
      ],
      gender: "female",
    },
    availability_details: {
      creator_id: "6fed9cfe-3e44-4435-9ca2-26c363073500",
      location: "2086 Pamela Bridge",
      available: false,
      foster: false,
      adopt: false,
      reserved: true,
      organisation_name: "Broadridge Financial Solutions",
      organisation_picture: "/bin/associate.plc.pcf",
    },
    animal_suitability: {
      children: "6-12",
      other_dogs: "Prefers other pets",
      other_cats: "Prefers other pets",
    },
  },
];

const getAllAnimals = (req, res, next) => {
  // in requesting access to users, this network request is literally just setting the response json to be called users with the value of the DUMMY_USERS
  res.json({ animals: DUMMY_ANIMALS });
};

const getByAnimalId = (req, res, next) => {
  //request property with params (params added by express JS is an object.)
  //params property holds an object where my dynamic :id exists as key which results in the concrete value the user request has entered. So for example :
  // animalId is equal to req.params.aid, which is also listed in the router.get("/:aid"). When I look for the animal.id in the DUMMY_ANIMALS arr of obj, im asking for the animal.id in this object to match the req.params.aid, which will actually be the value of the id in the obj in the URL. So if my url ends in.../a1, im saying if my url (req.params.aid) is equal to animal.id in the DUMMY_ANIMALS obj, display data. Therefore, a1 will return my first animal.
  const animalId = req.params.aid;
  const animal = DUMMY_ANIMALS.find((animal) => {
    return animal.id === animalId;
  });

  console.log("GET Request in Animal ID");

  if (!animal) {
    // this is the setup for the error handling middleware set in server.js.
    // we set up an error const as new Error, provide our error.code, and then use next(error) -  This will then trigger the middleware func for error handling in server.js. We use next(error) as this handles asynchronous code once connected to the database.

    return next(new HttpError("Could not find Animal ID", 404));
    // always return to stop remaining code executing on error
    // check out your http-error class that extends the Error method to provide your code and message in one line as opposed to writing over multiple lines.
  }

  res.json({ animal });
};

const getByAnimalType = (req, res, next) => {
  const { type } = req.params;

  const animalType = DUMMY_ANIMALS.filter((t) => {
    return t.animal_specific.type.toLowerCase() === type.toLowerCase();
  });
  console.log("GET request by animal type");
  if (!animalType || animalType.length === 0) {
    return next(new HttpError("Could not find animal type", 404));
  }
  res.json({ animalType });
};

const getByAnimalTypeSize = (req, res, next) => {
  const { type, size } = req.params;
  const typeSize = DUMMY_ANIMALS.filter((s) => {
    return (
      s.animal_specific.size.toLowerCase() === size.toLowerCase() &&
      s.animal_specific.type.toLowerCase() === type.toLowerCase()
    );
  });
  console.log("GET request by animal type and  size");
  if (!typeSize || typeSize.length === 0) {
    return next(
      new HttpError("Could not find size and/or type for animal", 404)
    );
  }

  res.json({ typeSize });
};

/*const getByAnimalTypeSizeAge = (req, res, next) => {
  const { type, size, age } = req.params;

  const animalTSA = DUMMY_ANIMALS.filter((tsa) => {
    return (
      tsa.animal_specific.type === type &&
      tsa.animal_specific.size === size &&
      tsa.animal_specific.age === age
    );
  });
  console.log("GET Request by Animal type, size, age");
  if (!animalTSA || animalTSA.length === 0) {
    return next(
      new HttpError("Could not find animal matching type, size and age", 404)
    );
  }
  res.json({ animalTSA });
};

const getByAnimalTypeSizeAgeGender = (req, res, next) => {
  const { type, size, age, gender } = req.params;
  console.log(req.params);
  const animalTSAG = DUMMY_ANIMALS.filter((tsag) => {
    return (
      tsag.animal_specific.type === type &&
      tsag.animal_specific.size === size &&
      tsag.animal_specific.age === age &&
      tsag.animal_specific.gender === gender
    );
  });
  console.log("GET Request by Animal type, size, age, gender");

  if (!animalTSAG || animalTSAG.length === 0) {
    return next(
      new HttpError(
        "Could not find animal matching type, size, age and gender",
        404
      )
    );
  }
  res.json({ animalTSAG });
}; */

//GET FILTER

const getByAnimalFilter = (req, res, next) => {
  console.log("Get request by user filter");
  //extract filter params passed by user extracted from url queryParams
  const filters = req.query;

  // flatten object so you can filter by all keys inside the animal object - recursive.
  let flattenedObject = (obj, final = {}) => {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] != null) {
        flattenedObject(obj[key], final);
      } else {
        final[key] = obj[key];
      }
    }
    return final;
  };

  //store recursive results of dummy_animals.map into dummy_animals_flattened
  var DUMMY_ANIMALS_FLATTENED = DUMMY_ANIMALS.map((v) => flattenedObject(v));

  // filter to find matching filter queries. i.e for each filter passed, find that in the flattened obj, i.e type=dog &name=Jeff (boolean doesnt seem to work in the object, change object to strings, probably same for integers);
  var matchingFlattenedAnimals = DUMMY_ANIMALS_FLATTENED.filter((animal) => {
    let isFiltered = true;
    for (let key in filters) {
      isFiltered =
        isFiltered && animal[key].toLowerCase() === filters[key].toLowerCase();
    }
    return isFiltered;
  });

  //we now have all the animals matching the filter, but as a flattened object, so lets match them by ID in the flattened vs original nested obj structure and push into a new arr to return true obj struct.
  var filteredAnimals = [];
  DUMMY_ANIMALS.forEach((animal, i) => {
    matchingFlattenedAnimals.filter((matching) => {
      if (matching.id === animal.id) {
        filteredAnimals.push(animal);
      }
      return filteredAnimals;
    });
  });

  if (!filteredAnimals || filteredAnimals.length === 0) {
    return next(
      new HttpError("Could not find animals based on your search query", 404)
    );
  }

  res.json(filteredAnimals);
};

//GET REQUEST
const getByCreatorId = (req, res, next) => {
  const creatorId = req.params.cid;
  const creator = DUMMY_ANIMALS.filter((creator) => {
    return creator.availability_details.creator_id === creatorId;
  });
  console.log("GET Request in Creator ID");
  if (!creator || creator.length === 0) {
    return next(new HttpError("Could not find Creator ID", 404));
  }
  res.json({ creator });
};

//GET REQUEST
const getByCreatorName = (req, res, next) => {
  const creatorNameId = req.params.cname;
  const creatorName = DUMMY_ANIMALS.filter((names) => {
    return (
      names.availability_details.organisation_name.toLowerCase() ===
      creatorNameId.toLowerCase()
    );
  });
  console.log("GET Request in CreatorOrgName");
  if (!creatorName || creatorName.length === 0) {
    return next(new HttpError("Could not find Creator Organisation Name", 404));
  }
  res.json({ creatorName });
};

//GET REQUEST
const getByAnimalLocation = (req, res, next) => {
  const animalLocationReq = req.params.alocation;
  const animalLocation = DUMMY_ANIMALS.filter((locations) => {
    return (
      locations.availability_details.location.toLowerCase() ===
      animalLocationReq.toLowerCase()
    );
  });
  console.log("GET Request in animalLocation");
  if (!animalLocation || animalLocation.length === 0) {
    return next(new HttpError("Could not find Animals matching location", 404));
  }
  res.json({ animalLocation });
};

//POST REQUEST.
const createAnimal = (req, res, next) => {
  //this now validates the request object and sees if theres any validation errors based on my setup inside animal-routes. It will return an errors object.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("express-validator errors", errors);
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }

  // in post request we're asking for the req.body, not the req params. As we're posting, not getting. Then we use object destructing to basically say in the req.body, give me back the values in the post request into animal, availability, and suitability const(s). Then we put these values into the model/schema of the DUMMY_ANIMALS, so the `animal` key in the post request values should be put into the `animal_specific` key and its subsequent values, and so on.
  const { animal, availability, suitability } = req.body;

  const createdAnimal = {
    id: uuidv4(),
    animal_specific: animal,
    availability_details: availability,
    animal_suitability: suitability,
  };
  DUMMY_ANIMALS.push(createdAnimal);
  res.status(201).json({ animal: createdAnimal });
  console.log("POST Request in createAnimal");
};

//PATCH - update animal
//patch requests also havre a request body as you're updating specific fields
// ITS WORKING. AND I DONT KNOW HOW. AND ITS AWFULLY WRITTEN.
const updateAnimal = (req, res, next) => {
  const { animal, availability, suitability } = req.body;
  let animalReqKeys;
  let availabilityReqKeys;
  let suitabilityReqKeys;
  //get the Object keys for the body request (animal, availability, suitability)

  animalReqKeys = Object.keys(animal);
  availabilityReqKeys = Object.keys(availability);
  suitabilityReqKeys = Object.keys(suitability);

  let allReqKeys = [].concat(
    animalReqKeys,
    availabilityReqKeys,
    suitabilityReqKeys
  );

  //we also need the ID of the animal which will be in the URL aka what you set the path as. In this case we set it as aid.
  const animalId = req.params.aid;
  //spread operator as its an object and otehrwise we're updating reference, similar to react.//find the id of animal and the index of animal in arr.
  let updatedAnimal = { ...DUMMY_ANIMALS.find((a) => a.id === animalId) };
  const animalIndex = DUMMY_ANIMALS.findIndex((a) => a.id === animalId);

  //update the name/breed/size in object of animal against whats in the body of patch request.
  //empty arr
  var emptyArr = [];
  //for each Object key in updatedAnimal, push these to emptyArr.
  for (var key in updatedAnimal) {
    emptyArr.push(Object.keys(updatedAnimal[key]));
  }
  //We now have multiple arrs within the single array, so concat these to be a single arr
  let mergedArr = [].concat.apply([], emptyArr);

  //filter out where the original object (mergedArr) of our animal is also within the req.body for keys. This way we can match what keys have actually been added to be updated.
  const arrMatches = mergedArr.filter((matching) =>
    allReqKeys.includes(matching)
  );

  //for loop, for the matching keys
  for (var keyMatch in arrMatches) {
    // let the object keys of updatedAnimal.animal_specific // suitability match - is this needed as its already asserted? Didnt seem to work..
    var updatedAnimalArr = mergedArr.find(
      (prop) => prop === arrMatches[keyMatch]
    );

    const animalSuit = (updatedAnimal.animal_suitability[updatedAnimalArr] =
      suitability[updatedAnimalArr]);
    const animalSpec = (updatedAnimal.animal_specific[updatedAnimalArr] =
      animal[updatedAnimalArr]);
    const animalAvail = (updatedAnimal.availability_details[updatedAnimalArr] =
      availability[updatedAnimalArr]);
  }

  /*
  console.log("ANIMO", animal);
  console.log("00.allReqKeys", allReqKeys);
  console.log("1.emptyArr", emptyArr);
  console.log("2.mergedArr", mergedArr);
  console.log("3.arrMatches", arrMatches);
  console.log("4.updatedAnimalArr", updatedAnimalArr);
  console.log("5.updatedAnimal", updatedAnimal);*/

  //update obj by id INDEX in arr
  DUMMY_ANIMALS[animalIndex] = updatedAnimal;
  //return 200 and updatedAnimal is equal to animal.
  res.status(200).json({ animal: updatedAnimal });
};

//DELETE
const deleteAnimal = (req, res, next) => {
  //get ID of req params aid (url id passed)
  const animalId = req.params.aid;

  //if already deleted, not to show that its been deleted with the 'deleted animal'.
  if (!DUMMY_ANIMALS.find((animal) => animal.id === animalId)) {
    throw new HttpError("Could not find animal for this id", 404);
  }
  //here we override original array with filtered array instead of returning a new array from filter.
  //get ID of animal, then filter and remove.
  DUMMY_ANIMALS = DUMMY_ANIMALS.filter((a) => a.id !== animalId);
  res.status(200).json({ message: "Deleted animal." });
};

// to export multiples dont use module.exports, use (but dont execute with (), just passing reference) :
exports.getAllAnimals = getAllAnimals;
exports.getByAnimalId = getByAnimalId;
exports.getByAnimalType = getByAnimalType;
//exports.getByAnimalTypeSizeAge = getByAnimalTypeSizeAge;
exports.getByAnimalTypeSize = getByAnimalTypeSize;
//exports.getByAnimalTypeSizeAgeGender = getByAnimalTypeSizeAgeGender;
exports.getByAnimalLocation = getByAnimalLocation;
exports.getByAnimalFilter = getByAnimalFilter;
exports.getByCreatorName = getByCreatorName;
exports.getByCreatorId = getByCreatorId;
exports.createAnimal = createAnimal;
exports.updateAnimal = updateAnimal;
exports.deleteAnimal = deleteAnimal;
