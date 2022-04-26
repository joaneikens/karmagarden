import random
from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import QuestionSerializer, AnswerSerializer
from .models import Question,Answer

class QuestionView(viewsets.ReadOnlyModelViewSet):
    serializer_class = QuestionSerializer
    queryset = Question.objects.all()

    @action(detail=True)
    def get_answers(self, request, pk=None):
        answers_to_question = Answer.objects.filter(question_id=pk).order_by('display_ordering')
        serializer = AnswerSerializer(answers_to_question, many=True)
        return Response(serializer.data)

    @action(detail=False)
    def get_random_question(self, request):
        questions = list(Question.objects.all())
        random_question = random.choice(questions)
        serializer = QuestionSerializer(random_question)
        return Response(serializer.data)
    	
