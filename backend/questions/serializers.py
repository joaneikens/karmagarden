from rest_framework import serializers
from .models import Question, Answer

class QuestionSerializer(serializers.ModelSerializer):
	class Meta:
		model = Question
		fields = ('id', 'post_title','post_text', 'question_type')

class AnswerSerializer(serializers.ModelSerializer):
	class Meta: 
		model = Answer
		fields = ('question','answer_text','display_ordering','correct_ordering')
