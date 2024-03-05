resource "aws_elastic_beanstalk_application" "weather-app" {
  name        = var.application_name
  description = var.application_environment
}

resource "aws_elastic_beanstalk_environment" "weather-app-prod" {
  name                = "${var.application_name}-${var.application_environment}"
  application         = aws_elastic_beanstalk_application.weather-app.name
  solution_stack_name = "64bit Amazon Linux 2 v3.5.12 running Python 3.8"
  cname_prefix        = var.app_name

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }

}

output "elastic_beanstalk_app_url" {
  value = "http://${aws_elastic_beanstalk_environment.weather-app-prod.cname}"
}












resource "aws_s3_bucket" "weather_app_front_static" {
  bucket = "weather-app-bucket-http"
}

resource "aws_s3_bucket_public_access_block" "weather_app_front_static" {
  bucket = aws_s3_bucket.weather_app_front_static.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

