resource "aws_elastic_beanstalk_application" "tftest" {
  name        = "weather-app"
  description = "beanstack weather app description"
}

resource "aws_elastic_beanstalk_environment" "tfenvtest" {
  name                = "weather-app"
  application         = aws_elastic_beanstalk_application.tftest.name
  solution_stack_name = "64bit Amazon Linux 2 v3.3.6 running Python 3.8"

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "EnvironmentType"
    value     = "SingleInstance"
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro"
  }
}

resource "aws_s3_bucket" "weather_app_front_static" {
  bucket = "weather_app_bucket_http"
}

resource "aws_s3_bucket_public_access_block" "weather_app_front_static" {
  bucket = aws_s3_bucket.weather_app_front_static.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}