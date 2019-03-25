import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Login from './Login';
import Register from './Register';

export default class HomePage extends Component {
  render() {
    let background = require('../assets/img/background.jpg');
    let logo = require('../assets/svg/logo.svg');
    let startupIcon = require('../assets/svg/startup-icon.svg');
    let ideaIcon = require('../assets/svg/idea-icon.svg');
    let targetIcon = require('../assets/svg/target-icon.svg');
    let quoteIcon = require('../assets/svg/quote-icon.svg');
    let pet1 = require('../assets/img/pet1.png');
    let pet2 = require('../assets/img/pet2.jpg');
    let pet3 = require('../assets/img/pet3.jpg');

    let arrStyles = [
      require('../stylesheets/bootstrap.css'),
      require('../stylesheets/main.css'),
      require('../stylesheets/bootstrap-dropdownhover.min.css'),
      require('../stylesheets/flexSlider.css'),
      require('../stylesheets/magnific-popup.css'),
      require('../stylesheets/fonts.css')
    ];

    // let arrJavascripts = [
    //   require('../javascripts/jquery-1.12.4.min.js'),
    //   require('../javascripts/bootstrap.min.js'),
    //   require('../javascripts/bootstrap-dropdownhover.min.js'),
    //   require('../javascripts/jquery.flexslider-min.js'),
    //   require('../javascripts/smooth-scroll.js'),
    //   require('../javascripts/jquery.magnific-popup.min.js'),
    //   require('../javascripts/jquery.countdown.min.js'),
    //   require('../javascripts/typed.min.js'),
    //   require('../javascripts/typeanimation.js'),
    //   require('../javascripts/placeholders.min.js'),
    //   require('../javascripts/script.js')
    // ];

    let styles, javascripts;

    for (let css of arrStyles) {
      styles += <link href={ css } rel="stylesheet" type="text/css" media="all"/>;
    }
    // for (let script in arrJavascripts) {
    //   javascripts += <script src={script} ></script>;
    // }

    return (
      <div>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Home - IS4302 Charity" />
        </Helmet>
        <div>
          <div class="loader">
            <div class="loader-inner">
              <svg width="120" height="220" viewbox="0 0 100 100" class="loading-spinner" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                <circle class="spinner" cx="50" cy="50" r="21" fill="#ffffff" stroke-width="4" />
              </svg>
            </div>
          </div>
          <div class="wrapper">
            <div class="modal login fade" id="search" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="p-5">
                    <form class="d-flex">
                      <div class=" input-group form mr-2">
                        <div class="input-group-prepend ">
                           <span class="input-group-text form-icon">
                              <span class="fa fa-search form-icon-inner"></span>
                           </span>
                        </div>
                        <input class="form-control" name="search" placeholder="Search" type="text" />
                      </div>
                      <button class="btn btn-primary" type="submit">
                        Go
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <header class="header">
              <div class="container ">
                <div class="floating-nav mt-lg-5 ">
                  <nav class="navbar navbar-expand-lg header-navbar ">
                    <div class="navbar-brand">
                      <a class=" navbar-brand navbar-logo" href="index.html">
                        <img class="mb-0" src={logo} alt=""/>
                      </a>
                    </div>
                    <button class="navbar-toggler btn-navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".nav-menu" aria-expanded="true" aria-label="Toggle navigation">
                      <span class="fa fa-bars"></span>
                    </button>
                    <div class="nav-menu collapse navbar-collapse navbar-collapse justify-content-end py-0 ">
                      <ul class=" navbar-nav  header-navbar-nav">
                        <li><a class=" nav-link" href="index.html">Home</a></li>
                        <li class="dropdown">
                          <a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="true">
                            Pages<span class="dropdown-arrow ml-2">
                                 <span class="fa fa-angle-down dropdown-arrow-inner"></span>
                              </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="about.html">About</a></li>
                            <li><a class="dropdown-item" href="service.html">Services</a></li>
                            <li><a class="dropdown-item" href="comingsoon.html">Comingsoon</a></li>
                            <li><a class="dropdown-item" href="404.html">404</a></li>
                            <li><a class="dropdown-item" href="hireus.html">Hire us</a></li>
                            <li><a class="dropdown-item" href="faq.html">FAQ</a></li>
                          </ul>
                        </li>
                        <li class="dropdown">
                          <a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="true">
                            Works<span class="dropdown-arrow ml-2">
                                 <span class="fa fa-angle-down dropdown-arrow-inner"></span>
                              </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="portfolio-grid-2.html">Grid works 2</a></li>
                            <li><a class="dropdown-item" href="portfolio-grid-3.html">Grid works 3</a></li>
                            <li><a class="dropdown-item" href="portfolio-single.html">Single work</a></li>
                          </ul>
                        </li>
                        <li class="dropdown">
                          <a href="javascript:;" class="nav-link dropdown-toggle" data-toggle="dropdown"
                             aria-haspopup="true" aria-expanded="true">
                            Blog<span class="dropdown-arrow ml-2">
                                 <span class="fa fa-angle-down dropdown-arrow-inner"></span>
                              </span>
                          </a>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="blog-full-width.html">Full Width</a></li>
                            <li><a class="dropdown-item" href="blog-right-sidebar.html">Right sidebar</a></li>
                            <li><a class="dropdown-item" href="blog-left-sidebar.html">Left sidebar</a></li>
                            <li><a class="dropdown-item" href="blog-single.html">Single post</a></li>
                            <li><a class="dropdown-item" href="blog-single-left-sidebar.html">Single left sidebar</a>
                            </li>
                            <li><a class="dropdown-item" href="blog-single-right-sidebar.html">Single right
                              sidebar</a></li>
                          </ul>
                        </li>
                        <li><a class="nav-link" href="contact.html">Contact</a></li>
                        <li class="btn-nav mr-lg-3"><a class="btn btn-primary btn-sm " href="#login" data-toggle="modal"
                                                       data-target="#login"><span class="fa fa-user-circle mr-1"></span>Login/Register</a></li>
                        <li>
                          <a class="btn btn-xs btn-icon btn-text-dark pb-3 pb-lg-0 pl-0 pt-0" href="#search"
                             data-toggle="modal" data-target="#search">
                            <span class="fa fa-search "></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </header>
            <section class="hero">
              <div class="background-img gradient-overlay gradient-overlay-dark">
                <img src={background} alt="" />
              </div>
              <div class="container height-70vh">
                <div class="row justify-content-center text-center">
                  <div class="col-12 col-md-10 col-lg-10">
                    <h1 class="display-4 mb-3 text-white">Find a pet caretaker <span class="typed font-weight-600"></span>
                    </h1>
                    <p class="lead mb-5 text-white">Alternatively, partner with us to be a pet caretaker today! <br/>
                      Lovepets, you most trusted pet sitting service</p>
                    <a class="play-but text-center mt-3 popup-youtube" href="https://www.youtube.com/watch?v=WoJyVEzRtuM">
                     <span class="play-icon play-icon-md">
                        <span class="fa fa-play play-icon-inner"></span>
                     </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
            <section class="spacer-double-lg">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col ">
                    <div class="mb-5  text-center">
                      <h1>Connecting pets to pet lovers</h1>
                      <p class="w-md-75 mb-0 mx-auto">Lovepets is a Singapore-based technology company offering pet
                        caring services. Find out more today!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row justify-content-center text-center">
                  <div class="col">
                    <a class="btn btn-primary btn-wide mb-2 mb-md-0 mr-md-2" href="#login" data-toggle="modal"
                       data-target="#login">Looking for pets</a>
                    <a class="btn btn-blue-night btn-wide mb-2 mb-md-0" href="#login" data-toggle="modal"
                       data-target="#login">Pets sitters</a>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col">
                    <div class="mb-5 pb-5 mt-5 pt-5">
                      <hr />
                    </div>
                  </div>
                </div>
              </div>
              <div class="container">
                <div class="row">
                  <div class="col-md-4 mb-4 mb-lg-0">
                    <div class="text-center px-3">
                      <img class="max-width-md mb-3" src={startupIcon} alt="" />
                        <h3 class="h5">Reservation Guarantee</h3>
                        <p class="mb-0">If your Pet Sitter, Walker or Groomer has to cancel at the last minute, we’ll work with you to find a new one.</p>
                    </div>
                  </div>
                  <div class="col-md-4 mb-4 mb-lg-0">
                    <div class="text-center px-3">
                      <img class="max-width-md mb-3" src={ideaIcon} alt="" />
                        <h3 class="h5">Free Protection</h3>
                        <p class="mb-0 ">Pet safety is our top priority. Every stay booked through LovePets is covered by
                          premium insurance.</p>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="text-center px-3">
                      <img class="max-width-md mb-3" src={targetIcon} alt="" />
                        <h3 class="h5 ">Top Quality</h3>
                        <p class="mb-0  ">All bookings on LovePets are entitled to leave a transparent verified review.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container  mt-5 pt-5">
                <div class="row justify-content-center text-left">
                  <div class="col">
                    <div class="bg-azure p-5 rounded shadow-lg">
                      <div class="p-lg-4">
                        <img class="max-width-sm ml-sm-4 mb-4 " src={quoteIcon} alt="" />
                          <div class="bg-review-slider flexSlider p-sm-4 pt-0">
                            <ul class="slides">
                              <li>
                                <blockquote class="h4 text-white font-weight-light mb-5">HIGHLY RECOMMENDED! Eric and
                                  Rachel took very great care of my baby Coco for Pet Day Care. Their corgi doudou is
                                  so cute and friendly. He constantly updates me by sending pictures of Coco. I am
                                  assured that she is in good hands and need not worry while I was working. It is
                                  great to see Coco socialize and play with others dogs.s</blockquote>
                                <blockquote class="h4 text-white font-weight-light mb-5"></blockquote>
                                <h3 class="h6 text-white mb-0">Jessie</h3>
                                <span class="d-block text-light font-size-14">Pet Owner of Coco</span>
                              </li>
                              <li>
                                <blockquote class="h4 text-white font-weight-light mb-5">Thank you Mark! This was the
                                  first time I had to engage someone to look after my shy and fickle felines, and I
                                  couldn't have made a better choice. Mark thoroughly enquired on their habits and
                                  environment and offered great tips on grooming and socialisation for my already
                                  timid kitties. He kept me updated with photos from each visit and gave me detailed
                                  information about whether they were eating right and coming out to play. I'll be
                                  sure to call him again the next time I need assistance. Great job and thank you
                                  again!</blockquote>
                                <h3 class="h6 text-white mb-0">Angela</h3>
                                <span class="d-block text-light font-size-14">Pet Owner of Muffin</span>
                              </li>
                            </ul>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="spacer-double-lg bg-gray">
              <div class="container">
                <div class="row justify-content-between align-items-center">
                  <div class="col-lg-5 col-md-6 order-md-1 mb-5 mb-md-0">
                    <h2>Advantage of being LovePets’s sitter...</h2>
                    <p>Freedom to choose your schedule, services, and quote.</p>
                    <p>Your service will be allocated to near by pet parents.</p>
                    <p>We will help you manage & handle pet parent’s booking and request.</p>

                    <a class="btn btn-sm btn-primary " href="#">
                      Learn More
                      <span class="fa fa-angle-right font-size-14 ml-2"></span>
                    </a>
                  </div>
                  <div class="col-lg-7 col-md-6 order-md-2">
                    <div class="text-left text-lg-right">
                      <img class="img-fluid w-lg-75 w-100" src={pet1} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="spacer-double-lg ">
              <div class="container">
                <div class="row justify-content-between align-items-center">
                  <div class="col-lg-5 col-md-6 order-md-2 mb-5 mb-md-0">
                    <h2>We Encourage Pet Sitter ...</h2>
                    <p>To provide a “Cage Free” pet service.</p>
                    <p>Upload as many photos as possible reflecting your dedication and enthusiasm for the care of the
                      pets you sit.</p>
                    <p>Add a brief bio describing yourself demonstrating your ability,skill or knowledge to the care of
                      animals.</p>
                    <p>Regularly updated your personal information. </p>
                    <a class="btn btn-sm btn-primary " href="#">
                      Learn More
                      <span class="fa fa-angle-right font-size-14 ml-2"></span>
                    </a>
                  </div>
                  <div class="col-lg-7 col-md-6 order-md-1 ">
                    <div class="text-left">
                      <img class="img-fluid w-lg-75 w-100" src={pet2} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="spacer-double-lg bg-gray">
              <div class="container">
                <div class="row justify-content-between align-items-center">
                  <div class="col-lg-5 col-md-6 order-md-1 mb-5 mb-md-0">
                    <h2>Once you partnered as Sitter , your have to:</h2>
                    <p>To personally deliver the services you have promised in a friendly and professional manner.</p>
                    <p>To respond quickly (within 24 hours) and professionally to customer inquiries and booking requests.
                    </p>
                    <a class="btn btn-sm btn-primary " href="#">
                      Learn More
                      <span class="fa fa-angle-right font-size-14 ml-2"></span>
                    </a>
                  </div>
                  <div class="col-lg-7 col-md-6 order-md-2 ">
                    <div class="text-left text-lg-right">
                      <img class="img-fluid w-lg-75 w-100" src={pet3} alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section class="spacer-double-xxs text-center bg-azure">
              <div class="container">
                <div class="row">
                  <div class="col">
                  <span class="mr-2 text-white"><span class=" fa fa-microphone mr-2"></span>This website is last updated
                     on March 10</span>

                  </div>
                </div>
              </div>
            </section>
            <footer class="bg-dark spacer-double-md">
              <div class="container">
                <div class="row justify-content-between">
                  <div class="col-lg-4 d-flex align-items-start flex-column">
                    <a class="d-inline-block mb-4" href="javascript:;">
                      <img src={logo} class="footer-logo" alt="" />
                    </a>
                    <p class="font-size-12 text-light">&copy; 2019 all rights reserved - LovePets. <br/>A product of
                      mutationthemes.</p>
                  </div>
                  <div class="col-6 col-md-4 col-lg-2 mb-0">
                    <h3 class="h6 text-white mb-3 font-weight-600">About us</h3>
                    <div class="list-group list-group-flush">
                      <a class="list-group-item list-group-item-action" href="javascript:;">About</a>
                      <a class="list-group-item list-group-item-action" href="javascript:;">Services</a>
                      <a class="list-group-item list-group-item-action" href="javascript:;">Hire us</a>
                    </div>
                  </div>
                  <div class="col-6 col-md-4 col-lg-2 mb-0">
                    <h3 class="h6 text-white mb-3 font-weight-600">Help &amp; Support</h3>
                    <div class="list-group list-group-flush">
                      <a class="list-group-item list-group-item-action" href="javascript:;">Contact us</a>
                      <a class="list-group-item list-group-item-action" href="javascript:;">Legals</a>
                      <a class="list-group-item list-group-item-action" href="javascript:;">FAQ</a>
                    </div>
                  </div>
                  <div class="col-6 col-md-4 col-lg-3  mb-0">
                    <h3 class="h6 text-white mb-3 font-weight-600">Social hubs</h3>
                    <ul class="list-inline mb-0">
                      <li class="list-inline-item mb-2 mb-lg-0 mr-1"><a class="social-icon" href="javascript:;"><span
                        class="fab fa-facebook-f"></span></a></li>
                      <li class="list-inline-item mr-1"><a class="social-icon " href="javascript:;"><span
                        class="fab fa-twitter"></span></a></li>
                      <li class="list-inline-item mr-1"><a class="social-icon " href="javascript:;"><span
                        class="fab fa-youtube"></span></a></li>
                      <li class="list-inline-item"><a class="social-icon " href="javascript:;"><span
                        class="fab fa-linkedin"></span></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </footer>
            <div class="modal login fade" id="login" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="p-5">
                    <Login/>
                    <div class="text-center mb-3">
                      <p class="text-muted small mb-0">
                        Don't have an account yet?
                        <a href="#register" data-toggle="modal" data-target="#register" data-dismiss="modal">Create an
                          account</a>
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="modal login fade" id="register" tabindex="-1" role="dialog" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="p-5">
                    <Register/>
                  </div>

                </div>
              </div>
            </div>
            <a class="scroll-to-top scroll" href="#wrapper"><span class=" fa fa-angle-up top-icon "></span></a>
          </div>
        </div>
      </div>
    );
  }
}