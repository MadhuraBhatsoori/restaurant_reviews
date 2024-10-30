## Steps to recreate the project

Register for Redpanda Serverless, Pinecone and openAI. Create an .env file to save the environment variables required for Redpanda Connect.

1. Clone the repository.
2. Navigate to src folder in the directory.
3. Install redpanda RPK and requirements.txt
4. Run mongo_load.yaml to load the data:
    rpk connect run -e .env mongo_load.yaml
5. Run review_converter locally or deploy it on Redpanda Serverless:
    rpk connect run -e .env review_converter.yaml
6. Run flask server as backend:
    python3 backend.py
7. Run react application to chat:
    npm start



## Inspiration

In today’s fast-paced dining culture, customers often want quick and reliable insights into a restaurant’s best dishes, rather than scrolling through endless reviews. Restaurant owners and managers similarly face challenges in processing hundreds of customer reviews to understand their strengths and pain points. While reviews are full of valuable information, finding and processing that information can be tedious. This application addresses the gap by allowing users to interact directly with restaurant reviews to uncover popular dishes, access quality, and make more informed dining decisions. The target audience includes food enthusiasts, restaurant owners, bloggers, and travellers looking for quick, data-driven dining insights.

## What it does

Our application helps people to interact with restaurant reviews by using redpanda connect (open AI) to analyse and extract meaningful insights from customer experiences. User needs to enter restuarant name and simply chat with the app to discover top-rated menu items, get personalised dish recommendations, and understand the overall dining experience at any restaurant. For restaurant owners, it transforms scattered feedback into actionable business intelligence, tracking trends and customer satisfaction over time.

## How we built it

The application uses a combination of redpanda, mongoDB, openAI, pinecone, and react frontend to deliver real-time insights from customer reviews. MongoDB stores the raw reviews, which flow seamlessly into redpanda Connect, ensuring that new data is always available for processing without any interruptions. Once connected, Redpanda's serverless technology streams and processes these reviews in real-time, making sure every new piece of feedback is immediately accessible for insight generation.

OpenAI embedding is used to transform reviews into vector embeddings, capturing the essence of the feedback. These embeddings are then stored in pinecone, a vector database that makes finding similar reviews a quick and efficient process. When users search for something specific, like the best dish recommendations or details about the dining experience, pinecone instantly retrieves reviews that match the meaning of their query, not just the words.

The react frontend has a chat interface where users can freely explore the insights hidden within the reviews. They can ask questions, look for suggestions about different menu items or experiences. With each query, the frontend sends the request which is sent to openAI and pinecone to deliver the most relevant, meaningful responses, in just a few seconds.

## Results

Users can now make informed decisions quickly, enhancing their dining experiences and helps restaurant managers understand customer preferences for menu improvements. This approach can be replicated for other types of reviews, offering similar value across industries such as hospitality, retail, and e-commerce.
