<?php
if(!$_POST) exit;

    $to 	  = 'someemail@somedomain.com'; #Replace your email id...
	$datetimepicker    = $_POST['datetimepicker'];
	$name	  		   = $_POST['txtname'];
	$email             = $_POST['txtemail'];
	$datetimepicker    = $_POST['txtphone'];
    $comment           = $_POST['txtmessage'];
        
	if(get_magic_quotes_gpc()) { $comment = stripslashes($comment); }

	 $subject = 'You\'ve been contacted by ' . $name . ' for Reservation.';

	 $msg  = "You have been contacted by $name.\r\n\n";
	 $msg .= "Preferred Date : $datetimepicker\r\n\n";
	 $msg .= "$comment\r\n\n";
	 $msg .= "You can contact $name via email, $email.\r\n\n";
	 $msg .= "-------------------------------------------------------------------------------------------\r\n";
								
	 if(@mail($to, $subject, $msg, "From: $email\r\nReturn-Path: $email\r\n"))
	 {
		 echo "<span class='success-msg'>Thanks for Contacting Us, We will call back to you soon.</span>";
	 }
	 else
	 {
		 echo "<span class='error-msg'>Sorry your message not sent, Try again Later.</span>";
	 }
?>