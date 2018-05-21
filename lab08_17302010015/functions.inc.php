<?php
error_reporting(0);

function generateLink($url, $label, $class) {
   $link = '<a href="' . $url . '" class="' . $class . '">';
   $link .= $label;
   $link .= '</a>';
   return $link;
}

function outputPostRow($number)  {
    include("travel-data.inc.php");
    echo "<div class=\"row\"><div class=\"col-md-4\"><a href=\"post.php?id=";
    echo ${postId.$number};
    echo "\" class=\"\"><img src=\"images/";
    echo ${thumb.$number};
    echo "\" alt=\"";
    echo ${title.$number};
    echo "\" class=\"img-responsive\"/></a></div><div class=\"col-md-8\"><h2>";
    echo ${title.$number};
    echo "</h2><div class=\"details\">Posted by <a href=\"user.php?id=";
    echo ${userId.$number};
    echo "\" class=\"\">";
    echo ${userName.$number};
    echo "</a><span class=\"pull-right\">";
    echo ${date.$number};
    echo "</span><p class=\"ratings\">";
    echo  constructRating(${reviewsRating.$number});
    echo ${reviewsNum.$number};
    echo "Reviews</p></div><p class='excerpt'>";
    echo ${excerpt.$number};
    echo "</p><p><a href=\"post.php?id=";
    echo ${postId.$number};
    echo "\" class=\"btn btn-primary btn-sm\">Read more</a></p></div></div><hr/>";
}

/*
  Function constructs a string containing the <img> tags necessary to display
  star images that reflect a rating out of 5
*/
function constructRating($rating) {
    $imgTags = "";

    // first output the gold stars
    for ($i=0; $i < $rating; $i++) {
        $imgTags .= '<img src="images/star-gold.svg" width="16" />';
    }

    // then fill remainder with white stars
    for ($i=$rating; $i < 5; $i++) {
        $imgTags .= '<img src="images/star-white.svg" width="16" />';
    }

    return $imgTags;
}

?>