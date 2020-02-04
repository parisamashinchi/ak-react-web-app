import styled from 'styled-components';
import WithDirection, { direction } from 'containers/layouts/withDirection';

const BlogWrapper = styled.div`
    background-image: linear-gradient(to bottom right, grey, darkgray);
    padding: 60px 0;
    @media (max-width: 1350px){
        background-position:left -70% bottom;
    };
    .first {
        background-color: #FF6600;
    }
    .second {
        background-color: #6343CF;
    }
    .third {
        background-color: #6699FF;
    }
    .fourth {
        background-color: #3CBA85;
    }
    .effect-chico:hover {
        filter: brightness(1);
    }
    .blog {
      margin: 0 auto;
      width:70%;
      max-width: 1000px;
          @media (max-width: 1200px){
             width : 80%;
          };
          @media (max-width: 992px){
             width : 90%;
          };
          @media (max-width: 768px){
             width : 90%;
          };
           @media (max-width: 576px){
             width : 100%;
          };
    }
   .align-center{
        text-align: center;
    }
    .box-1 {
        height: 300px;
        padding: 10px;
        border-radius: 10px;
    }
    .box-2 {
        height: 240px;
        padding: 10px;
        border-radius: 10px;
    }
    .box-3 {
        height: 240px;
        padding: 10px;
        border-radius: 10px;
    }
    .box-4 {
        height: 300px;
        padding: 10px;
        border-radius: 10px;
    }
    .box-5 {
        height: 300px;
        padding: 10px;
        border-radius: 10px;
    }
    .box-6 {
        height: 240px;
        padding: 10px;
        border-radius: 10px;
    }
     .box-5 .effect-chico{
        background: #FF5416;
    }
    .mb-40 {
        margin-bottom: 40px;
    }
    h3 {
       margin-bottom: 0;
       color: white;
       font-size:30px;
        @media (max-width: 1350px){
          font-size: 30px;
        };
        @media (max-width: 1110px){
          font-size: 20px;
        };
        @media (max-width: 952px){
          font-size: 15px;
        };
    }
    h2 {
      color: white;
       font-size: 45px;
       @media (max-width: 1350px){
          font-size: 40px;
        };
        @media (max-width: 1110px){
          font-size: 30px;
        };
        @media (max-width: 952px){
          font-size: 20px;
        };
       @media (max-width: 768px){
         font-size: 20px!important;
        };
        @media (max-width: 576px){
          font-size: 20px!important;
        };
    }
  
/* Common style */
.grid figure {
	position: relative;
	overflow: hidden;
	box-shadow: 0px 0px red, -1em -1em 9.5em #223044;
	margin: 0;
	width: 100%;
	height: 100%;
	background: #1E264F;
	text-align: center;
	cursor: pointer;
	border-radius: 10px;
	filter: brightness(.7);
	transition: 500ms;
      img {
        position: relative;
        display: block;
        object-fit: cover;
        opacity: 0.8;
        height: 100%;
      }
     figcaption {
        padding: 2em;
        color: white;
        text-align: left;
        font-size: 1.25em;
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        
         figcaption::before,
         figcaption::after {
        pointer-events: none;
      }
    }
   }

.grid figure figcaption,
.grid figure figcaption > a {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

/* Anchor will cover the whole item by default */
/* For some effects it will show as a button */
.grid figure figcaption > a {
	z-index: 1000;
	text-indent: 200%;
	white-space: nowrap;
	font-size: 0;
	opacity: 0;
}

.grid figure h2 {
	font-weight: 300;
	color: white;
	  font-size: 1.5rem;
	    @media (max-width: 1350px){
          font-size: 1.2rem;
        };
     span {
        font-weight: 800;
    }
}

.grid figure h2,
.grid figure p {
	margin: 0;
}

.grid figure p {
	letter-spacing: 1px;
	font-size: 80%;
	color: white;
}
/*---------------*/
/***** Chico *****/
/*---------------*/

figure.effect-chico img {
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
	-webkit-transform: scale(1.12);
	transform: scale(1.12);
}

figure.effect-chico:hover img {
	opacity: 0.5;
	-webkit-transform: scale(1);
	transform: scale(1);
}

figure.effect-chico figcaption {
	padding: 3em 2em;
	text-align:${direction === 'rtl' ? 'right' : 'left'};
}

figure.effect-chico figcaption::before {
	position: absolute;
	top: 30px;
	right: 30px;
	bottom: 30px;
	left: 30px;
	//border: 1px solid #fff;
	content: '';
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}

figure.effect-chico figcaption::before,
figure.effect-chico p {
	opacity: 0;
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
    @media (max-width: 576px){
       opacity: 1;
    }
}

figure.effect-chico p {
	 display: inline;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
}

figure.effect-chico:hover figcaption::before,
figure.effect-chico:hover p {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}

figure.effect-chico:hover p {
  max-width: 100%; 
}
@media screen and (max-width: 50em) {
	.content {
		padding: 0 10px;
		text-align: center;
	}
	.grid figure {
		display: inline-block;
		float: none;
		margin: 10px auto;
		width: 100%;
	}
}
.fa-arrow-right:before {
  ${direction === 'rtl' ? { content: '"\\F060"' } : ''};
}
`;

const BlogStyle = WithDirection(BlogWrapper);
export default BlogStyle;
