variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "Name of the S3 bucket for the website"
  type        = string
}

variable "environment" {
  description = "Environment name (e.g., dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "domain_name" {
  description = "Custom domain name for the website (optional)"
  type        = string
  default     = ""
}

variable "ssl_certificate_arn" {
  description = "ARN of the SSL certificate in ACM (required if domain_name is provided)"
  type        = string
  default     = ""
}

variable "cloudfront_price_class" {
  description = "CloudFront price class"
  type        = string
  default     = "PriceClass_100"
  validation {
    condition = contains([
      "PriceClass_All",
      "PriceClass_200",
      "PriceClass_100"
    ], var.cloudfront_price_class)
    error_message = "Price class must be one of: PriceClass_All, PriceClass_200, PriceClass_100."
  }
}

variable "create_github_actions_role" {
  description = "Whether to create IAM role for GitHub Actions deployment"
  type        = bool
  default     = false
}

variable "github_repository" {
  description = "GitHub repository in format 'owner/repo' (required if create_github_actions_role is true)"
  type        = string
  default     = ""
}

variable "github_oidc_provider_arn" {
  description = "ARN of existing GitHub OIDC provider (if not creating a new one)"
  type        = string
  default     = ""
}

variable "create_github_oidc_provider" {
  description = "Whether to create GitHub OIDC provider"
  type        = bool
  default     = false
}