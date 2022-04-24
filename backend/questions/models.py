from django.db import models

class Question(models.Model):
	SORT_POPULARITY = 'POPULARITY'
	SORT_REPLIES = 'REPLIES'
	QUESTION_TYPE_OPTIONS = [
	(SORT_POPULARITY, 'Sort comments from most to least popular.'),
	(SORT_REPLIES, 'Sort comments in order of reply.')
	]
	question_type = models.CharField(choices = QUESTION_TYPE_OPTIONS, max_length = 20)
	post_title = models.TextField()
	post_text = models.TextField()

class Answer(models.Model):
	question = models.ForeignKey('Question', on_delete=models.CASCADE)
	answer_text = models.TextField()
	display_ordering = models.IntegerField()
	correct_ordering = models.IntegerField()
