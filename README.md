# Coding assessment
Coding assessment - Online queuing system - Submitted by Brian Lai

### Features

- Order + queue system (Support local deployment or AWS Lambda deployment for distributed system)
- Serverless + distributed design (AWS Lambda, AWS Cloudformation (with S3 and ApiGateway))
- Session based token for queuing
- ReactJs for client side, queue waiting and send order after finish queuing

### Framework 

- Client : reactJs, react-scripts / jest, jwt-simple
- Order + queue system : SQLAlchemy orm, PyJWT, Flask, pymysql, unittest
- AWS Deployment : Serverless

### Folder

- Unit Test : Functional unit test code
- Test Data : Data for testing in endpoints
- Order : Order with online queue system using Python for AWS Lambda serving
- Client : Client UI for online queue waiting and place orders after queuing
- Documentation : Documentation
- Setup : Setup script for database initialization
- Deploy : Deployment script for Serverless framework
- Tools : Tools for encryption (in env-prd.yml), encoding and local server script for testing

### Prerequsite

- AWS IAM setup with AWS Lambda deployment capability
- AWS RDS MySQL (Current setup is using AWS RDS MySQL as illustration)
- AWS VPC setup that AWS Lambda is able to connect to public and to AWS RDS MySQL 
- Serverless framework for AWS Lambda deployment
- For more details please refer to Documentation folder

### Technical Assessment Requirement

- Client and Backend are required to show queuing system is in function
- Provide time estimation of the queue, current position for waiting
- Support high volume of queuing users
- Can use local or in-memory repository
- Calls and creditals should be secured
- Logging / documentation and testing are expected as part of the solution.

### Time limit

- 48 hours

### Remarks

- Using cryptography / cryptocode / simple-crypt will show **invalid elf header** in AWS Lambda (Under osx development). This project will use JWT for configuration encryption and decryption.

### Contact
- Linkedin : https://www.linkedin.com/in/brianlaihkhk/
- Github : https://github.com/brianlaihkhk/
