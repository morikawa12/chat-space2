json.id @message.id
json.user_name @message.user.name
json.date @message.created_at.datetime.to_s(:datetime)
json.content @message.content
json.image @message.image_url


